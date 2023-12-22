const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Signup
exports.signupUser = catchAsyncErrors(async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    mobile,
    username,
    password,
    confirmpassword,
  } = req.body;
  
  if (req.body.password !== req.body.confirmpassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }
  // const randacc = Math.floor(Math.random() * 9000 + 1000);
  // primary_account_number = parseInt("9999"+randacc);
  // savings_account_number = parseInt("8888"+randacc);
  
  




  const user = await User.create({
    first_name,
    last_name,
    email,
    mobile,
    username,
    password,
  });


  sendToken(user, 201, res);
});


// exports.loadinguser = catchAsyncErrors(async (req, res, next) => {
//   const { accounttype,userId,accountnumber } = req.body;
//   // console.log(req.user._id);
  
//   // console.log(savingnumber);

//   const account = await UserAccount.create({
//     userId,
//     accounttype,
//     accountnumber,
//   });
//   // console.log(req.user._id);

//   res.status(201).json({
//     success: true,
//     account,
//   });
// });







exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user has givern password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("Invalid Email", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   user,
  //   token,
  // });

  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forget password

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  //get resetpassword
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:3000/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, Please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Online Banking Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not Match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {


  const users = await User.find();


  res.status(200).json({
    success: true,
    users,
  });
});
exports.getOneUsers = catchAsyncErrors(async (req, res, next) => {


  const users = await User.findById(req.params.id);


  res.json(users)
});


exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is Incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});


exports.updateProfile = catchAsyncErrors(async(req,res,next) =>{
  try{
          const requests = await User.findById(req.params.id);
    console.log(req.body);
          if(req.body.disable_status){
              requests.disable_status = req.body.disable_status
          }
          const update = await requests.save()
          res.json(update)
         
    
      }catch{
          res.json({message:error})
      }
})


exports.getUserSearch = catchAsyncErrors(async(req,res,next) => {
  try{ const requests = await User.find({
      "$or" :[
          
          {first_name:{$regex:req.params.key}},
          {last_name:{$regex:req.params.key}},
          {email:{$regex:req.params.key}},
          {username:{$regex:req.params.key}},
          {role:{$regex:req.params.key}},
         
        
          

      ]
    });
    res.send(requests)}
    catch{
      res.json({message:error})
    }
})

exports.getAllUserData = catchAsyncErrors(async(req,res,next)=>{
  
    try {
       
      
      const results = await User.aggregate([
        {
          $lookup: {
            from: "useraccounts",
            localField: "_id",
            foreignField: "userId",
            as: "userData",
          },
        },
       
      ]);
  
      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  
  
})

exports.JoinAllUserTransfer = catchAsyncErrors(async(req,res,next)=>{
  
  try {
     
    
    const results = await User.aggregate([
      {
        $lookup: {
          from: "user_transfers",
          localField: "_id",
          foreignField: "userId",
          as: "userData1",
        },
      },
     
    ]);

    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }


})