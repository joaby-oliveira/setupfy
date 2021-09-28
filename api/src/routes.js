const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const auth = require('./middlewares/auth');

const PostController = require('./controllers/PostController');
const UserController = require("./controllers/UserController");
const TagController = require("./controllers/TagController");
const CommentController = require('./controllers/CommentController');

const router = express.Router();

router.post("/user", multer(multerConfig).single('file'), UserController.create);
router.get("/user/:userName", auth, UserController.findUserByName);
router.get("/users", auth, UserController.findAllUsers);
router.get("/users/:id", auth, UserController.findUserById);
router.put("/user/:id", auth, multer(multerConfig).single('file'), UserController.update);
router.delete("/user/:id", auth, UserController.delete);
router.post("/auth", UserController.auth);

router.post("/post", auth, multer(multerConfig).single('file'), PostController.create);
router.get("/posts", PostController.findAll);
router.get("/posts/:tag", auth, PostController.findByTag);
router.delete("/post/:id", auth, PostController.delete);
router.put("/post/:id", auth, multer(multerConfig).single('file'), PostController.update);
router.get("/post/like/:id", auth, PostController.postLikes);

router.get("/user/posts/:id", auth, PostController.findByUserId);

router.get("/tags", auth, TagController.findAll);

router.post("/comment", auth, CommentController.create);
router.get("/comments/:postId", CommentController.findAll);
router.delete("/comment/:id", auth, CommentController.delete);
router.put("/comment/:id", auth, CommentController.update);

router.post("/userDidLike", auth, PostController.userDidLikePost)
router.post("/didUserLike", auth, PostController.didUserLikePost)

module.exports = router;