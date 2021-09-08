const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const PostController = require('./controllers/PostController');
const UserController = require("./controllers/UserController");
const TagController = require("./controllers/TagController");

const router = express.Router();

router.post("/user", multer(multerConfig).single('file'), UserController.create);
router.get("/user/:userName", UserController.findUserByName);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.put("/user/:id", multer(multerConfig).single('file'), UserController.update);

router.post("/post",PostController.create);
router.get("/posts",PostController.findAll);

router.get("/tags",TagController.findAll);

module.exports = router;