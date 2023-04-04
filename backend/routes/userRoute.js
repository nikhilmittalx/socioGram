const express = require("express");
const { registerUser, getUserProfile, logout, loginUser, updatePassword, updateProfile, followUser, forgotPassword, deleteProfile, resetPassword, getMyPosts, getUserPosts, myProfile, getAllUsers, getSuggestedUsers, } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/delete/me").delete(isAuthenticated, deleteProfile);
router.route("/logout").get(logout);

router.route("/password/update").put(updatePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/update/profile").put(updateProfile)

router.route("/follow/:id").get(isAuthenticated, followUser)
router.route("/user/:id").get(isAuthenticated, getUserProfile)


router.route("/my/posts").get(isAuthenticated, getMyPosts);
router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/users/suggested").get(isAuthenticated, getSuggestedUsers);


module.exports = router