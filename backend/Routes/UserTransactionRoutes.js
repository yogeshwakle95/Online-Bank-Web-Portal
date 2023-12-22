const router=require("express").Router();

const Request4=require("../Controllers/UserTransactionController")

router.get("/",Request4.transfer_all)
router.get("/:id",Request4.transfer_one)
router.get("/userTransactionAll/data/:searchTerm",Request4.joinAllUserTransaction)
router.get("/adminUserTransaction/data",Request4.adminUserTransactionAllData)
router.put("/:id",Request4.transfer_update)
router.post("/",Request4.transfer_post)
module.exports=router


    
    







    