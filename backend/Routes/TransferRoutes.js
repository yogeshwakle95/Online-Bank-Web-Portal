const router=require("express").Router();

const Request4=require("../Controllers/TransferController")

router.get("/",Request4.transfer_all)
router.get("/id/:id",Request4.transfer_one)
router.get("/:key",Request4.search_transfers_by_all)
router.get("/allTransferUser/users",Request4.joinAllUserTransfer)
router.put("/:id",Request4.transfer_update)


router.get("/userTransferData/data/:searchTerm",Request4.joinAllTransferdata)
router.post("/",Request4.transfer_post)
module.exports=router


    
    





    
    
    