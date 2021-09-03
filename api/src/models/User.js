const database = require("../database/database");

class User{
    async create(data){
        try{
            const user = await database.insert(data).table("users");
            return {status: true, msg: 'Usuário inserido', user}
        }catch(err){
            return {status: false, msg: 'Usuário não pode ser inserido'}
        }
    }

    async findByEmail(email){
        try{
            let user = await database.select().table("users").where({email: email});
            return {status: true, user}
        }catch(err){
            return {status: false, msg: err}
        }
    }

    async findByName(userName){
        try{
            let user = await database.select().table("users").where('userName', 'like', '%'+ userName +'%');
            return {status: true, user}
        }catch(err){
            return {status: false, user}
        }
    }

    async findAllUsers(){
        try{
            let user = await database.select().table("users");
            return {status: true, user}
        }catch(err){
            return {status: false, user}
        }
    }

    async findById(id){
        try{
            let user = await database.select().table("users").where({id: id});
            return {status: true, user}
        }catch(err){
            return {status: false, msg: err}
        }
    }

    async update(data, id){
        try{
           let result = await database.update(data).table("users").where({id: id})
           return {status: true, msg: "Usuário atualizado com sucesso", result}
        }catch(err){
            return {status: false, msg: 'Usuário não pode ser atualizado erro: ' + err}
        }
    }
    async insertImage(image){
        try{
            await database.insert(image).table("userImages");
            return {status: true, msg: 'Imagem inserido'}
        }catch(err){
            return {status: false, err: err}
        }
    }
}

module.exports = new User();