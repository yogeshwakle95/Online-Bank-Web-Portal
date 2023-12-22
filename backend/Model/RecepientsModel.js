

const mongoose=require("mongoose")

const newSchema4=new mongoose.Schema({
   userId:{
      type:String,
     
   },
   recipientName:{
      type:String
   },
   bankName:{
      type:String
   },
   accountNumber:{
      type:String
   },
  
   swiftCode: {
    type: String,
   
  },
  recipientaccountId: {
    type: String,
   
  },
  recipientType: {
    type: String,
  },
  isApproved:{
    type:String
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
module.exports=mongoose.model("user_recipients",newSchema4)
// user_recipients
//   _id
//   userId
//   recipientName
//   bankName
//   accountNumber
//   swiftCode
//   recipientaccountId
//   recipientType
//   isApproved
//   dateCreated
//   dateApproved
//   approvedBy





