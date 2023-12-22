const newSchema1 = require("../Model/ChequebookModel")

const chequebook_all = async(req,res)=>{
    try{
        const requests = await newSchema1.find();
        res.json(requests)

    }catch{
        res.json({message:error})
    }
}

const chequebook_one = async(req,res)=>{
   
    try{
        const requests = await newSchema1.findById(req.params.id);
        res.json(requests)
    

    }catch{
        res.json({message:error})
    }
}

const chequebook_update = async(req,res)=>{
    try{
        const requests = await newSchema1.findById(req.params.id);

      
        if(req.body.isApproved){
            requests.isApproved = req.body.isApproved
        }
        if(req.body.approvedBy){
            requests.approvedBy = req.body.approvedBy
        }
        if(req.body.dateApproved){
            requests.dateApproved = req.body.dateApproved
        }
        
        
        const update = await requests.save()
        res.json(update)
       

    }catch{
        res.json({message:error})
    }
}

const chequebook_post = async(req,res)=>{
    
        var new_post = new newSchema1({
            userId:req.body.userId,
           
            transactionType:req.body.transactionType,
            description:req.body.description,
            isApproved : req.body.isApproved,

            dateCreated:req.body.dateCreated,
            dateApproved : req.body.dateApproved,
            approvedBy : req.body.approvedBy,
            
        
        })
        new_post.save(function (err, new_post) {
          if (err) { return next(err) }
          res.json(201, new_post)
        })
}


const search_chequebook_by_all = async(req,res)=>{

    try{ 
        const requests = await newSchema1.find({
            
         "$or" :[
             
            
             {userId:{$regex:req.params.key}},
            
         ]
     });
     res.send(requests)}
     catch{
         res.json({message:error})
     }
 
 }


 const adminChequebookDataAll = async (req, res) => {
    try {
       
      
      const results = await newSchema1.aggregate([
        {
            $lookup: {
              from: "users",
              let: { userId: { $toObjectId: "$userId" } },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
              ],
              as: "userData"
            }
          },
       
      ]);
  
      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };


module.exports={
    chequebook_post,
    chequebook_one,
    chequebook_update,
    chequebook_all,
    search_chequebook_by_all,
    adminChequebookDataAll
}


