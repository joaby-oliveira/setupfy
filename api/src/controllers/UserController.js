const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcryptjs');
const utils = require('../utils');
const path = require('path');
const jwt = require('jsonwebtoken');

const { unlink } = require('fs');
const imgPath = path.resolve(__dirname, '..', '..', 'tmp', 'images')

require('dotenv').config()

const salt = bcrypt.genSaltSync(10);

const userValidation = {
    userName: (userName, res) => {
        if(userName == undefined || utils.isEmpty(userName) || !utils.isValidLength(userName, 3)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O nome de usuário deve ter pelo menos 3 caracteres"
            });
            res.utilized = true
            return false;
        }else if(utils.isSpaced(userName)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O nome de usuário não deve ter espaços"
            });
            res.utilized = true
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
            res.utilized = true
            return false;
        }else if(utils.isSpaced(email)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "O email não deve ter espaços"
            });
            res.utilized = true
            return false;
        }else if(!utils.isValidEmail(email)){
            res.statusCode = 406;
            res.json({
                status: false,
                msg: "Digite um email válido"
            });
            res.utilized = true
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
            res.utilized = true
            return false;
        }
    }
}

class UserController{
    async create(req, res){
        try{
            const {userName, email, password} = req.body;
            res.utilized = false;
            
            userValidation.userName(userName, res);
            userValidation.email(email, res);
            userValidation.password(password, res);
            
            if (res.utilized === false) {
                
                const hash = bcrypt.hashSync(password, salt);
                
                const data = {
                    userName,
                    email,
                    password: hash
                }

                const { user } = await User.findByEmail(data.email);
                if(user.length == 0){
                    await User.create(data);
                    if(req.file != undefined){
                        const { user: newUser } = await User.findByEmail(data.email);
                        const image = {
                            name: req.file.filename,
                            url: process.env.FILES_URL + req.file.filename,
                            user_id: newUser[0].id
                        }
                        await User.insertImage(image);
                    }
                    res.statusCode = 201;
                    res.json({status: true, msg: "usuário inserido com sucesso"})
                }else{
                    if(req.file != undefined)
                    unlink(imgPath + '/' + req.file.filename, (err) => {
                        if (err) throw err
                    })
                    res.statusCode = 406;
                    res.json({status: false, msg: "O email inserido já foi cadastrado"})
                }
            }else {
                if(req.file != undefined)
                unlink(imgPath + '/' + req.file.filename, (err) => {
                    if (err) throw err
                })
            }
        }catch(err){
            res.statusCode = 406;
            res.json({status: false, err: err})
        }
    }

    async findUserByName(req, res){
        try{
            const  userName = req.params.userName;

            const {users} = await User.findByName(userName);
            if(users.length > 0) {
                res.statusCode = 200;
                res.json({users})
            }else{
                res.statusCode = 404;
                res.json({
                    status: false, 
                    msg: "Usuário não encontrado!"
                })
            }
    
        }catch(err){
            res.statusCode = 406;
            res.json({status: false, err: err})
        }
    }
    async findUserById(req, res){
        try{
            const  id = req.params.id;

            const  {users} = await User.findById(id);
            console.log(users, id)
            if(users.length > 0) {
                res.statusCode = 200;
                res.json({ users })
            }else{
                res.statusCode = 406;
                res.json({
                    status: false, 
                    msg: "Usuário não encontrado!"
                })
            }
        }catch(err){
            res.statusCode = 406;
            res.json({status: false, err: err})
        }
    }
    
    async findAllUsers(req, res){
        try{
            const {user} = await User.findAllUsers();
            if(user.length > 0) {
                res.statusCode = 200;
                res.json({ user })
            }else{
                res.statusCode = 406;
                res.json({
                    status: false, 
                    msg: "Não há usuários na base de dados"
                })
            }
        }catch(err){
            res.statusCode = 406;
            res.json({status: false, err: err})
        }
    }
    async update(req, res){
        try{
            const {userName, email, password} = req.body;
            const id = req.params.id;
            const imgPath = path.resolve(__dirname, '..', '..', 'tmp', 'images')

            let {users: user} = await User.findById(id);
            if (user.length > 0){
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
                        if(req.file != undefined){
                            unlink(imgPath + '/' + req.file.filename, (err) => {
                                if (err) throw err
                            })
                        }
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
                await User.update(data, id);
                if(req.file != undefined) {
                    const {image: img} = await User.findImage(id)
                    
                    const image = {
                        name: req.file.filename,
                        url: process.env.FILES_URL + req.file.filename,
                        user_id: id
                    }

                    if (img.length > 0) { 
                        unlink(imgPath + '/' + img[0].name, (err) => {})
                        await User.updateImage(image, id);
                    } else {
                        await User.insertImage(image)
                    }
                }
                res.statusCode = 200;
                res.json({status: true, msg: "Usuário editado com sucesso"})
            }else {
                if(req.file != undefined){
                    unlink(imgPath + '/' + req.file.filename, (err) => {
                        if (err) throw err
                    })
                }
                res.statusCode = 404;
                res.json({ status: false,  msg: "Usuário não encontrado!"})
                
            }

        }catch(err){
            res.statusCode = 406;
            res.json({status: false, err})
        }
    }

    async delete (req, res) {
        try {
            const {id} = req.params;
            const {users: user} = await User.findById(id)
            
            if(user.length > 0) {
                const {image} = await User.findImage(id)
                if(image.length > 0)
                    unlink(imgPath + '/' + image[0].name, (err) => {})

                const posts = await Post.findByUserId(id)
                console.log(posts)
                for(const post of posts) {
                    console.log(post.id)
                    const {img} = await Post.findImage(post.id)
                    
                    console.log(img[0].name)
                    
                    if(img.length > 0)
                        unlink(imgPath + '/' + img[0].name, (err) => {})

                    await Post.delete(id)
                }

                await User.delete(id)

                res.statusCode = 200;
                res.json({status: true, msg: "Usuário deletado com sucesso"})
            }else {
                res.statusCode = 404;
                res.json({ status: false,  msg: "Usuário não encontrado!"})
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, err})
        }
    }

    async auth (req, res) {
        try {
            const { email, password } = req.body;
            res.utilized = false

            userValidation.email(email, res);
            userValidation.password(password, res);

            if (res.utilized == false) {
                const {user} = await User.findByEmail(email);
                if(user.length > 0) {
                    bcrypt.compare(password, user[0].password, (err, result) => {
                        if (result) {
                            jwt.sign(
                                {
                                    id: user[0].id, 
                                    userName: user[0].userName, 
                                    email: user[0].email
                                },
                                process.env.JWT_SECRET,
                                {expiresIn: '7d'},
                                (err, token) => {
                                    if (err) {
                                        res.statusCode = 500;
                                        res.json({status: false, msg: "Erro: " + err});
                                    } else {
                                        res.statusCode = 200;
                                        res.json({status: true, token});
                                    }
                                }
                            )
                        } else {
                            res.statusCode = 401;
                            res.json({ status: false,  msg: "Senha inválida"})
                        }
                    })   
                } else {
                    res.statusCode = 404;
                    res.json({ status: false,  msg: "E-mail não encontrado na base de dados"})
                }
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, err})
        }
    }
}

module.exports = new UserController();