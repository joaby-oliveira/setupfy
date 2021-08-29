const User = require("../models/User");
const bcrypt = require('bcryptjs');
const utils = require('../utils');

class UserController{
    async create(req, res){
        const {userName, email, password} = req.body;
        
        if(userName == undefined || utils.isEmpty(userName) || !utils.isValidLength(userName, 3)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O nome de usuário deve ter pelo menos 3 caracteres"
            });
            return;
        }else if(utils.isSpaced(userName)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O nome de usuário não deve ter espaços"
            });
            return;
        }

        if(email == undefined || utils.isEmpty(email) || !utils.isValidLength(email, 2)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O email deve ter mais de 2 caracteres"
            });
            return;
        }else if(utils.isSpaced(email)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O email não deve ter espaços"
            });
            return;
        }else if(!utils.isValidEmail(email)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "Digite um email válido"
            });
            return;
        }

        if(!utils.isValidLength(password, 8)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "A senha deve ter pelo menos 8 caracteres"
            });
            return;
        }

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
    async findUser(req, res){
        const  userName = req.params.userName;

        const {status, user} = await User.findByName(userName);
        if(user.length > 0) {
            res.statusCode = 200;
            res.json({
                status, 
                user
            })
        }else{
            res.statusCode = 406;
            res.json({
                status: false, 
                msg: "Usuário não encontrado!"
            })
        }
    }
}

module.exports = new UserController();