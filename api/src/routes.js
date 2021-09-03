const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const router = express.Router();

const UserController = require("./controllers/UserController");

router.get('/', (req, res) => {
    res.send('eaeee');
});

router.post("/user", multer(multerConfig).single('file'), UserController.create);
router.post("/userImage", multer(multerConfig).single('file'), (req, res) =>{
    console.log(req.file)
    res.json({msg: "ok"});
})
router.get("/user/:userName", UserController.findUser);
router.get("/users", UserController.findAllUsers);
router.put("/user/:id", UserController.update);

module.exports = router;