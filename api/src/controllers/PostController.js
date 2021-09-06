const Post = require('../models/Post');

class PostController{
    async create(req, res){
        try{
            const {content, user_id, tags} = req.body;
            const data = {
                content,
                likes: 0,
                user_id
            }
            
            const post = await Post.create(data);

            res.statusCode = 201;
            res.json({status: true, msg: "Post inserido!"})

        }catch(err){
            res.statusCode = 406;
            res.json({status: false, msg: "Post não pode ser inserido " + err})
        }
    }
}

module.exports = new PostController();