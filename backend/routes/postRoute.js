const express = require("express");
const { createPost, likeUnlikePost, deletePost, getPostsOfFollowing, updateCaption, addComment, deleteComment, openPost } = require("../controllers/postController");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth")

router.route("/post/upload").post(isAuthenticated, createPost)
router.route("/post/:id").get(isAuthenticated, likeUnlikePost).delete(isAuthenticated , deletePost).put(isAuthenticated, updateCaption)

router.route("/posts").get(isAuthenticated, getPostsOfFollowing)
router.route("/post/comment/:id").post(isAuthenticated, addComment).delete(isAuthenticated, deleteComment)

router.route("/openPost/:id").get(isAuthenticated, openPost);


module.exports = router