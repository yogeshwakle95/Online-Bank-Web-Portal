//user_transactions
// _id
// userId
// accountId
// transactionType
// amount
// isApproved
// dateCreated
// dateApproved
// approvedBy



const mongoose=require("mongoose")

const newSchema5=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.ObjectId,
   },
   accountId:{
      type:String
   },
   transactionType:{
      type:String
   },
   amount:{
      type:Number
   },
   isApproved:{
    type:String,
       
   },
   dateCreated: {
    type: String,
   
  },
  dateApproved: {
    type: String,
   
  },
  approvedBy: {
    type: String,
  },
  

    
    
})
module.exports=mongoose.model("user_transaction",newSchema5)





