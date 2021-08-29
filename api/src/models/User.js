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
            // if(user !== ['']){
                return {status: true, user}
            // }else{
            //     return {status: false}
            // }
        }catch(err){
            return {status: false, msg: err}
        }
    }
}

module.exports = new User();