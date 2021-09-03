const User = require("../models/User");
const bcrypt = require('bcryptjs');
const utils = require('../utils');

const salt = bcrypt.genSaltSync(10);

const userValidation = {
    userName: (userName, res) => {
        if(userName == undefined || utils.isEmpty(userName) || !utils.isValidLength(userName, 3)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O nome de usuário deve ter pelo menos 3 caracteres"
            });
            return false;
        }else if(utils.isSpaced(userName)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O nome de usuário não deve ter espaços"
            });
            return false;
        }
    },
    email: (email, res) => {
        if(email == undefined || utils.isEmpty(email) || !utils.isValidLength(email, 2)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O email deve ter mais de 2 caracteres"
            });
            return false;
        }else if(utils.isSpaced(email)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O email não deve ter espaços"
            });
            return false;
        }else if(!utils.isValidEmail(email)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "Digite um email válido"
            });
            return false;
        }
    },
    password: (password, res) => {
        if(!utils.isValidLength(password, 8)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "A senha deve ter pelo menos 8 caracteres"
            });
            return false;
        }
    }
}

class UserController{
    async create(req, res){
        const {userName, email, password} = req.body;
        
        userValidation.userName(userName, res);
        userValidation.email(email, res);
        userValidation.password(password, res);
        

        
        const hash = bcrypt.hashSync(password, salt);
        
        const data = {
            userName,
            email,
            password: hash
        }

        const { status, user } = await User.findByEmail(data.email);
        if(user.length == 0){
            const { status, msg} = await User.create(data);
            if(status){
                const { user: newUser } = await User.findByEmail(data.email);
                const image = {
                    name: req.file.filename,
                    url: "localhost:8080/files/" + req.file.filename,
                    user_id: newUser[0].id
                }
                const {status, err} = await User.insertImage(image);
                if(status){
                    res.statusCode = 201;
                }else{
                    res.statusCode = 406;
                    res.json({status, err})
                }
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
    
    async findAllUsers(req, res){
        const {status, user} = await User.findAllUsers();
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
                msg: "Não há usuários na base de dados"
            })
        }
    }
    async update(req, res){
        try{
            const {userName, email, password} = req.body;
            const id = req.params.id;

            let {user} = await User.findById(id);
            let data = {
                id: user[0].id,
                userName: user[0].userName,
                email: user[0].email,
                password: user[0].password
            };

            if(userName != undefined){
                if(userValidation.userName(userName, res) == false)
                return;
                data.userName = userName;
            }
            if(email != undefined){
                if(userValidation.email(email, res) == false)
                return;
                data.email = email;
                const emailExists = await User.findByEmail(data.email);
                if(emailExists['user'].length != 0){
                    res.statusCode = 406;
                    res.json({status: false, msg: "O email inserido já foi cadastrado"})
                    return;
                }
            }
            if(password != undefined){
                if(userValidation.password(password, res) == false)
                return;
                const hash = bcrypt.hashSync(password, salt);
                data.password = hash;
            }
            
                const {status, msg} = await User.update(data, id);
                if(status){
                    res.statusCode = 201;
                    res.json({status, msg})
                    return;
                }else{
                    res.statusCode = 406;
                    res.json({status, msg})
                    return;
                }
        }catch(err){
            res.statusCode = 406;
            res.json({status: false, err: err})
        }
    }
}

module.exports = new UserController();