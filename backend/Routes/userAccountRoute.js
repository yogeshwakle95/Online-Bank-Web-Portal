const router=require("express").Router();

const Request4=require("../Controllers/userAccountController")

router.get("/",Request4.userAccount_all)
router.get("/join/:searchTerm",Request4.join_data)
router.get("/id/:id",Request4.userAccount_get_one)
router.get("/:key",Request4.search_userAccount_all)
router.post("/",Request4.userAccount_post);
router.get("/allData/userAdmin",Request4.adminUserDataAll)


router.put("/update/:id",Request4.updateUserAccount)
module.exports=router


    
    





    
    