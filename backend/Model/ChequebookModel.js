

const mongoose=require("mongoose")

const newSchema1=new mongoose.Schema({
   userId:{
      type:String,
   },
   transactionType:{
      type:String
   },
   description:{
      type:String
   },
  isApproved: {
    type: String,
  },
  dateCreated:{
   type:String
  },
  dateApproved: {
    type: String,
  },
  approvedBy:{
   type:String
  }
    

    
    
})
module.exports=mongoose.model("user_chequebook",newSchema1)





