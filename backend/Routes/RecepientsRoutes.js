const router=require("express").Router();

const Request3=require("../Controllers/RecepientsController")

router.get("/",Request3.recepients_all)

  router.get("/:id",Request3.recepients_one)


router.get("/id/join/:searchTerm",Request3.join_data1)

router.get("/id/:key",Request3.search_recipents_by_all)



router.put("/:id",Request3.recepients_update)



router.post("/",Request3.recepients_post)
module.exports=router


    
    
    

    
    
