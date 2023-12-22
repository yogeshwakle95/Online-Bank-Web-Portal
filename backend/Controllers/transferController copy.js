const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.transferAmount = catchAsyncErrors(async (req, res, next) => {
  console.log("Authenticated user is working");

  res.status(200).json({
    success: true,
    message: "Authenticated User Logged",
  });
});
