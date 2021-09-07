const database = require("../database/database");

class Post {
    async create(data){
        const post = await database.insert(data).table("posts");
        return post[0]
    }
    
    async tag_postInsert(data){
        const post = await database.insert(data).table("tag_post");
        return post[0]
    }
}

module.exports = new Post();