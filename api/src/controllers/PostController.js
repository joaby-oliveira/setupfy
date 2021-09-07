const Post = require('../models/Post');
const Tag = require("../models/Tag");

class PostController{
    async create(req, res){
        try{
            const {description, user_id, tags = []} = req.body;
            const data = {
                description,
                likes: 0,
                user_id
            }
            
            const post = await Post.create(data);

            tags.map(async (tag) => {
                const tagExists = await Tag.findOne(tag);
                let tagId = 0;
                if(tagExists.length != 0){
                    tagId = tagExists[0].id;
                }else{
                    const tagData ={
                        tag
                    }
                    tagId = await Tag.create(tagData);
                }
                const tag_postData = {
                    post_id: post,
                    tag_id: tagId
                }
                return await Post.tag_postInsert(tag_postData);
            });

            res.statusCode = 201;
            res.json({status: true, msg: "Post inserido!"});

        }catch(err){
            res.statusCode = 406;
            res.json({status: false, msg: "Post não pode ser inserido " + err});
        }
    }
}

module.exports = new PostController();