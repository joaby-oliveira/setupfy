const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const router = express.Router();

const UserController = require("./controllers/UserController");

router.post("/user", multer(multerConfig).single('file'), UserController.create);
router.get("/user/:userName", UserController.findUserByName);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.put("/user/:id", multer(multerConfig).single('file'), UserController.update);

module.exports = router;