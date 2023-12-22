const express = require("express");
const { transferAmount } = require("../controllers/transferController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/transfer").get(isAuthenticatedUser, transferAmount);

module.exports = router;
