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

    async tag_postDelete(id) {
        const tag = await database.delete().table("tag_post").where({post_id: id})
    }

    async findAll(){
        const posts = await database.select("posts.id", "posts.description", "posts.likes", "posts.user_id","postImages.url as imgUrl")
        .leftJoin("postImages", "postImages.post_id", "posts.id")
        .table("posts")

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

    async findByTag (tag) {
        const posts = await database.select("posts.id as post_id", "posts.description", "posts.likes", "postImages.url as postImage","users.id as user_id", "users.userName", "userImages.url as userImage","tags.tag")
            .table("tag_post")
            .innerJoin("posts", "posts.id", "tag_post.post_id")
            .innerJoin("tags", "tags.id", "tag_post.tag_id")
            .leftJoin("postImages", "postImages.post_id", "posts.id")
            .innerJoin("users", "users.id", "posts.user_id")
            .innerJoin("userImages", "userImages.user_id", "users.id")
            .where('tags.tag', 'like', '%' + tag + '%');

        return posts
    }

    async insertImage(image){
        let img = await database.insert(image).table("postImages");

        return { img }
    }

    async deleteImage(id){
        let img = await database.delete().table("postImages").where({post_id: id});
        return {img}
    }
    
    async findImage(id){
        let img = await database.select().table("postImages").where({post_id: id});
        return {img}
    }

    async updateImage(image, id){
        let img = await database.update(image).table("postImages").where({post_id: id});
        return { img }
    }

    async delete(id) {
        const post = await database.delete().table("posts").where({id: id})
    
        return post
    }

    async findByUserId (id) {
        const posts = await database.select("posts.id", "posts.description", "posts.likes", "postImages.url")
        .leftJoin("postImages", "postImages.post_id", "posts.id")
        .table("posts")
        .where({user_id: id})
        return posts
    }

    async update (data, id) {
        const post = await database.update(data).table("posts").where({id: id})
        return post
    }

    async userDidLikePost (user_id, post_id){
        const userPost = await database.insert({user_id, post_id}).table("user_did_like_post")
        return userPost
    }

    async didUserLikePost (user_id, post_id){
        const userPost = await database.select().table("user_did_like_post").where({user_id, post_id})
        return userPost
    }

    async userRemoveLike (user_id, post_id){
        const userPost = await database.delete().table("user_did_like_post").where({user_id, post_id})
        return userPost
    }

    async postLikes (post_id) {
        const postLikes = await database.select().table("user_did_like_post").where({post_id: post_id})
        return postLikes
    }
}

module.exports = new Post();