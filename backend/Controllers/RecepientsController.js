const newSchema3 = require("../Model/RecepientsModel");
var mongoose = require('mongoose');
const recepients_all = async(req,res)=>{
    try{
        const requests = await newSchema3.find();
        res.json(requests)

    }catch{
        res.json({message:error})
    }
}

const recepients_one = async(req,res)=>{
    try{
        const requests = await newSchema3.findById(req.params.id);
        res.json(requests)
       

    }catch{
        res.json({message:error})
    }
}



const search_recipents_by_all = async(req,res)=>{

   try{ 
    const requests = await newSchema3.find({
        "$or" :[
            
            {userId:{$regex:req.params.key}},
            {recipientaccountId:{$regex:req.params.key}},
            {recipientType:{$regex:req.params.key}},
            {isApproved:{$regex:req.params.key}},
            {accountCreated:{$regex:req.params.key}},
            {swiftCode:{$regex:req.params.key}},
          
            

        ]
    });
    res.send(requests)}
    catch{
        res.json({message:error})
    }

}



const join_data1 = async (req, res) => {
    const searchTerm = req.params.searchTerm;
    //var oUserId=new ObjectId(searchTerm);
    try {
       
      
      const results = await newSchema3.aggregate([
       
            
        
         {
              $lookup: {
                from: "users",
                let: { userId: { $toObjectId: "$userId" } },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
                ],
                as: "loginUser"
              }
            },
             {
                $unwind: "$loginUser"
              },
              {
                    $lookup: {
                      from: "useraccounts",
                      let: { recipientaccountId: { $toObjectId: "$recipientaccountId" } },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$recipientaccountId"] } } }
                      ],
                      as: "recipientsAccount"
                    }
                  },
                  {
                    $unwind: "$recipientsAccount"
                  },
                    {
                $lookup: {
                  from: "users",
                  localField: "recipientsAccount.userId",
                  foreignField: "_id",
                  as: "RecipientName"
                }
              },
                 {
                $unwind: "$RecipientName"
              },
              {
                $match: {
                    $or: [
                  
                       {userId:{$regex:searchTerm,$options:"i"}}
                      ],
                  
                }
              }
                  
      ])
  
      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };
  

  
  

const recepients_update = async(req,res)=>{
    try{
        const requests = await newSchema3.findById(req.params.id);

        if(req.body.userId){
            requests.userId = req.body.userId
        }
        if(req.body.recipientName){
            requests.recipientName = req.body.recipientName
        }
        if(req.body.bankName){
            requests.bankName = req.body.bankName
        }
        if(req.body.accountNumber){
            requests.accountNumber = req.body.accountNumber
        }
        if(req.body.swiftCode){
            requests.swiftCode = req.body.swiftCode
        }
        if(req.body.recipientaccountId){
            requests.recipientaccountId = req.body.recipientaccountId
        }
        if(req.body.recipientType){
            requests.recipientType = req.body.recipientType
        }
        if(req.body.isApproved){
            requests.isApproved = req.body.isApproved
        }
        if(req.body.dateCreated){
            requests.dateCreated = req.body.dateCreated
        }
        if(req.body.dateApproved){
            requests.dateApproved = req.body.dateApproved
        }
        if(req.body.approvedBy){
            requests.approvedBy = req.body.approvedBy
        }
        const update = await requests.save()
        res.json(update)
       

    }catch{
        res.json({message:error})
    }
}

const recepients_post = async(req,res)=>{
    
        var new_post = new newSchema3({
            userId:req.body.userId,
            recipientName:req.body.recipientName,
            bankName : req.body.bankName,
            accountNumber : req.body.accountNumber,
            swiftCode:req.body.swiftCode,
            recipientaccountId:req.body.recipientaccountId,
            recipientType : req.body.recipientType,
            isApproved : req.body.isApproved,
            dateCreated:req.body.dateCreated,
            dateApproved:req.body.dateApproved,
            approvedBy : req.body.approvedBy,
            
            
        
        })
        new_post.save(function (err, new_post) {
          if (err) { return next(err) }
          res.json(201, new_post)
        })
}




module.exports={
    recepients_post,
    recepients_update,
    recepients_one,
    recepients_all,
    search_recipents_by_all,
    join_data1,
    
    
}