

const mongoose=require("mongoose")

const newSchema5=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.ObjectId,
   },
   transferType:{
      type:String
   },
   fromAccountId:{
      type:String
   },
   recipientId:{
      type:String
   },
   dateCreated:{
    type:String,
       
   },
   amount: {
    type: Number,
   
  },
  comment: {
    type: String,
   
  },
  isApproved: {
    type: String,
  },
  approvedBy:{
   type:String,
   
  }  


    
    
})
module.exports=mongoose.model("user_transfer",newSchema5)
// user_transfers
//   _id
//   userId
//   transferType
//   fromAccountId
//   recipientId
//   amount
//   comment
//   isApproved
//   dateCreated
//   dateApproved
//   approvedBy





