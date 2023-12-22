const newSchema5 = require("../Model/UserTransaction")
const ObjectId = require('mongodb').ObjectId;
const transfer_all = async(req,res)=>{
    try{
        const requests = await newSchema5.find();
        res.json(requests)

    }catch{
        res.json({message:error})
    }
}

const transfer_one = async(req,res)=>{
    try{
        const requests = await newSchema5.findById(req.params.id);
        res.json(requests)
       

    }catch{
        res.json({message:error})
    }
}

const transfer_update = async(req,res)=>{
    try{
        const requests = await newSchema5.findById(req.params.id);

        if(req.body.userId){
            requests.transfer_status = req.body.transfer_status
        }
        if(req.body.accountId){
            requests.accountId = req.body.accountId
        }
        if(req.body.transactionType){
            requests.transactionType = req.body.transactionType
        }
        if(req.body.amount){
            requests.amount = req.body.amount
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

const transfer_post = async(req,res,next)=>{
    
        var new_post = new newSchema5({
            userId:req.body.userId,
            accountId:req.body.accountId,
            transactionType : req.body.transactionType,
            amount : req.body.amount,
            isApproved : req.body.isApproved,
            dateCreated : req.body.dateCreated,
            dateApproved : req.body.dateApproved,
            approvedBy : req.body.approvedBy,
        
        })
        new_post.save(function (err, new_post) {
            if (err) { return next(err) }
            res.json(201, new_post)
          })
  
}

const adminUserTransactionAllData = async(req,res,next)=>{
  
    try {
       
      
      const results = await newSchema5.aggregate([
        {
          $lookup: {
            from: "useraccounts",
            let: { accountId: { $toObjectId: "$accountId" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$accountId"] } } }
            ],
            as: "userAccounts"
          }
        },
         {
            $unwind: "$userAccounts"
          },
          {
            $lookup: {
              from: "users",
              localField: "userAccounts.userId",
              foreignField: "_id",
              as: "users"
            }
            
          },
          {$match:{"users.role":"user"}}
       
      ]);
  
      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  
  
  }





  const joinAllUserTransaction = async(req,res,next)=>{
    const searchTerm = req.params.searchTerm;
    try {
      const results = await newSchema5.aggregate([
        {
          $lookup: {
            from: "useraccounts",
            let: { accountId: { $toObjectId: "$accountId" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$accountId"] } } }
            ],
            as: "userAccounts"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userAccounts.userId",
            foreignField: "_id",
            as: "users"
          }
        },
        {
          $match: {
            $or: [
              { userId: ObjectId.isValid(searchTerm) ? ObjectId(searchTerm) : null }
            ],
          }
        }
      ]);
      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
  

module.exports={
    transfer_post,
    transfer_update,
    transfer_one,
    transfer_all,
     adminUserTransactionAllData,
     joinAllUserTransaction
}
