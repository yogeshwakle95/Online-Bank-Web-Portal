const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getAllUsers,
  updatePassword,
  getOneUsers,
  updateProfile,
  loadinguser,
  getUserSearch,
  getAllUserData,
  JoinAllUserTransfer,

  
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/users/:id").get(getOneUsers);
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/changepassword").put(isAuthenticatedUser,updatePassword);

router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/users/:id").put(updateProfile);
router.route("/userdata/:key").get(getUserSearch);
router.route("/allUserTransferData/users").get(JoinAllUserTransfer);
router.route("/allUserData/users").get(getAllUserData);
//admin Routes
router
  .route("/users")
  .get( getAllUsers);
  // router
  // .route("/")
  // .post(createAccount );

module.exports = router;
