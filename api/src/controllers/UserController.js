const User = require("../models/User");
const bcrypt = require('bcryptjs');

class UserController{
    async create(req, res){
        const {userName, email, password} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const data = {
            userName,
            email,
            password: hash
        }

        const { status, user } = await User.findByEmail(data.email);
        if(user.length == 0){
            const { status, msg } = await User.create(data);
            if(status){
                res.statusCode = 201;
                res.json({status, msg})
            }else{
                res.statusCode = 406;
                res.json({status, msg})
            }
        }else{
            res.statusCode = 406;
            res.json({status: false, msg: "O email inserido já foi cadastrado"})
        }

    }
}

module.exports = new UserController();