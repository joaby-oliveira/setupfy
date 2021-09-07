const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const PostController = require('./controllers/PostController');
const UserController = require("./controllers/UserController");

const router = express.Router();

router.post("/user", multer(multerConfig).single('file'), UserController.create);
router.get("/user/:userName", UserController.findUserByName);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.put("/user/:id", multer(multerConfig).single('file'), UserController.update);

router.post("/post",PostController.create)

module.exports = router;