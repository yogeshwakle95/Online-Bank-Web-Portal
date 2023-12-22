const router=require("express").Router();

const Request1=require("../Controllers/ChequebookController")

router.get("/",Request1.chequebook_all)

router.get("/id/:id",Request1.chequebook_one)
router.get("/search/:key",Request1.search_chequebook_by_all)
router.get("/chequebookall/data",Request1.adminChequebookDataAll)
router.put("/:id",Request1.chequebook_update)
router.post("/",Request1.chequebook_post)
module.exports=router




