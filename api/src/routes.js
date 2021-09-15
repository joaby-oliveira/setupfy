const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const PostController = require('./controllers/PostController');
const UserController = require("./controllers/UserController");
const TagController = require("./controllers/TagController");
const CommentController = require('./controllers/CommentController');

const router = express.Router();

router.post("/user", multer(multerConfig).single('file'), UserController.create);
router.get("/user/:userName", UserController.findUserByName);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.put("/user/:id", multer(multerConfig).single('file'), UserController.update);
router.delete("/user/:id", UserController.delete);

router.post("/post", multer(multerConfig).single('file'), PostController.create);
router.get("/posts", PostController.findAll);
router.get("/posts/:tag", PostController.findByTag);
router.delete("/post/:id", PostController.delete);

router.get("/user/posts/:id", PostController.findByUserId);

router.get("/tags",TagController.findAll);

router.post("/comment", CommentController.create);
router.get("/comments/:postId", CommentController.findAll);
router.delete("/comment/:id", CommentController.delete);
router.put("/comment/:id", CommentController.update);


module.exports = router;