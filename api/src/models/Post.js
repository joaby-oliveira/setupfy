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

    async findAll(){
        const posts = await database.select().table("posts")

        return posts
    }

    async findTags(id){
        const tags = await database.select()
        .innerJoin("tags", "tags.id", "tag_post.tag_id")
        .table("tag_post")
        .where("post_id", id)
        
        return tags;
    }

    async findById (id) {
        const post = await database.select().table("posts").where({id: id});

        return post;
    }
}

module.exports = new Post();