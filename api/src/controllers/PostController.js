const Post = require('../models/Post');
const Tag = require("../models/Tag");
const User = require("../models/User");
const path = require('path');
const { unlink } = require('fs');
const imgPath = path.resolve(__dirname, '..', '..', 'tmp', 'images')

class PostController{
    async create(req, res){
        try{
            const {description, user_id, tags = []} = req.body;
            const {users: user} = await User.findById(user_id)
            if (user.length > 0) {
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

                if (req.file != undefined) {
                    const image = {
                        name: req.file.filename,
                        url: process.env.FILES_URL + req.file.filename,
                        post_id: post
                    }
                    await Post.insertImage(image);
                }

                res.statusCode = 201;
                res.json({status: true, msg: "Post inserido!"});
            } else {
                if(req.file != undefined)
                    unlink(imgPath + '/' + req.file.filename, (err) => {
                        if (err) throw err
                    })
                res.statusCode = 404;
                res.json({status: false, msg: "Usuário não encontrado na base de dados"});
            }
        }catch(err){
            if(req.file != undefined)
                unlink(imgPath + '/' + req.file.filename, (err) => {
                    if (err) throw err
                })
            res.statusCode = 406;
            res.json({status: false, msg: "Post não pode ser inserido " + err});
        }
    }
    
    async findAll(req, res){
        try{
            let finalPosts = [], newPost = {};
            const posts = await Post.findAll();

            for(const post of posts){
                const {users: user} = await User.findById(post.user_id);
                const tags = await Post.findTags(post.id);
                let finalTags = [];

                for(const tag of tags){
                    finalTags.push(tag.tag);
                }

                newPost = {
                    post: {
                        id: post.id,
                        description: post.description,
                        likes: post.likes,
                        imgUrl: post.imgUrl
                    },
                    user: {
                        id: user[0].id,
                        userName: user[0].userName,
                        imgUrl: user[0].imgUrl
                    },
                    tags: finalTags
                }
                
                finalPosts.push(newPost);
            }

            res.statusCode = 200;
            res.json({status: true, posts: finalPosts});

        }catch(err){
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async findByTag (req, res ) {
        try {
            const {tag} = req.params;
            
            const posts = await Post.findByTag(tag)

            if (posts.length > 0) {
                res.statusCode = 200;
                res.json({status: true, posts});
            } else {
                res.statusCode = 406;
                res.json({status: false, msg: "Nenhum post foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }
}

module.exports = new PostController();