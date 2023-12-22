const newSchema4 = require("../Model/TransferModel")
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const transfer_all = async(req,res)=>{
    try{
        const requests = await newSchema4.find();
        res.json(requests)

    }catch{
        res.json({message:error})
    }
}

const transfer_one = async(req,res)=>{
    try{
        const requests = await newSchema4.findById(req.params.id);
        res.json(requests)
       

    }catch{
        res.json({message:error})
    }
}




const search_transfers_by_all = async(req,res)=>{

    try{ const requests = await newSchema4.find({
         "$or" :[
             
             {userId:{$regex:req.params.key}},
             {transferType:{$regex:req.params.key}},
             {fromAccountId:{$regex:req.params.key}},
             {recipientId:{$regex:req.params.key}},
             {accountCreated:{$regex:req.params.key}},
             {approvedBy:{$regex:req.params.key}}
             
 
         ]
     });
     res.send(requests)}
     catch{
         res.json({message:error})
     }
 
 }
const transfer_update = async(req,res)=>{
    try{
        const requests = await newSchema4.findById(req.params.id);

        if(req.body.isApproved){
            requests.isApproved = req.body.isApproved
        }
        const update = await requests.save()
        res.json(update)
       

    }catch{
        res.json({message:error})
    }
}

const transfer_post = async(req,res)=>{
    
        var new_post = new newSchema4({
            userId:req.body.userId,
            transferType:req.body.transferType,
            fromAccountId : req.body.fromAccountId,
            recipientId : req.body.recipientId,
            amount:req.body.amount,
            comment:req.body.comment,
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

const joinAllUserTransfer = async(req,res,next)=>{
  
    try {
       
      
      const results = await newSchema4.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userData1",
              },
        },
        {$match:{"userData1.role":"user"}}
       
      ]);
  
      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  
  
  }

  const joinAllTransferdata = async(req,res,next)=>{
    const searchTerm = req.params.searchTerm;
    try {
      const results = await newSchema4.aggregate([
        
        {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "username"
            }
          },
        {
            $match: {
              userId: mongoose.Types.ObjectId(searchTerm)
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
    search_transfers_by_all,
    joinAllUserTransfer,
    joinAllTransferdata
}