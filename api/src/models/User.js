const database = require("../database/database");

class User{
    async create(data){
        try{
            await database.insert(data).table("users");
            return {status: true, msg: 'Usuário inserido'}
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
}

module.exports = new User();