const database = require("../database/database");

class User{
    async create(data){
        const user = await database.insert(data).table("users");
        return user
    }

    async findByEmail(email){
        let user = await database.select().table("users").where({email: email});
        return {user}
    }

    async findByName(userName){
        let users = await database.select(["users.id", "users.userName", "users.email", "userImages.url as imgUrl"])
            .table("users")
            .innerJoin("userImages", "userImages.user_id", "users.id")
            .where('userName', 'like', '%'+ userName +'%');

        return {users}
    }

    async findAllUsers(){
        let user = await database.select(["users.id", "users.userName", "users.email", "userImages.url as imgUrl"])
            .table("users")
            .leftJoin("userImages", "userImages.user_id", "users.id")
        return {user}
    }

    async findById(id){
        let users = await database.select(["users.id", "users.userName", "users.email", "users.password", "userImages.url as imgUrl"])
            .table("users")
            .leftJoin("userImages", "userImages.user_id", "users.id")
            .where("users.id", id);

        return {users};
    }

    async update(data, id){
        let user = await database.update(data).table("users").where({id: id})
        return {user}
    }

    async insertImage(image){
        let img = await database.insert(image).table("userImages");
        return { img }
    }

    async updateImage(image, user_id){
        let img = await database.update(image).table("userImages").where({user_id: user_id});
        return { img }
    }

    async findImage(id){
        let image = await database.select().table("userImages").where({user_id: id});
        return {image}
    }

    async deleteImage(id){
        let image = await database.delete().table("userImages").where({user_id: id});
        return {image}
    }

    async delete (id) {
        const user = await database.delete().table("users").where({id: id});
        return {user}
    }
}

module.exports = new User();