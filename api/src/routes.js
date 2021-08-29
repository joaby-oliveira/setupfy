  
const express = require('express');

const router = express.Router();

const UserController = require("./controllers/UserController");

router.get('/', (req, res) => {
    res.send('eaeee');
});

router.post("/user", UserController.create);
router.get("/user/:userName", UserController.findUser);
router.get("/users", UserController.findAllUsers);

module.exports = router;