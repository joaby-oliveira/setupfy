const Post = require('../models/Post');
const Tag = require("../models/Tag");
const User = require("../models/User");
const utils = require("../utils")
const path = require('path');
const { unlink } = require('fs');
const imgPath = path.resolve(__dirname, '..', '..', 'tmp', 'images')

const postValidation = {
    string: (string, res, value, length) => {
        if (string === undefined || utils.isEmpty(string) || !utils.isValidLength(string, length)) {
            res.statusCode = 406
            res.json({
              status: false,
              msg: 'O campo ' + value + ' deve ter pelo menos ' + length + ' caracteres. '
            })
            res.utilized = true
            return false
        }
        if (utils.isDoubleSpaced(string) && res.utilized === false) {
          res.statusCode = 406
          res.json({
            status: false,
            msg: 'O campo ' + value + ' não deve ter mais de um espaço entre as palavras'
          })
          res.utilized = true
          return false
        }
    },
    number: (number, res, length, value) => {
        if (!utils.isValidMaxLength(number, length)) {
          res.statusCode = 406
          res.json({
            status: false,
            msg: 'O ' + value + ' deve ter no máximo ' + length + ' caracteres'
          })
          res.utilized = true
        }
      }
}

class PostController{
    async create(req, res){
        try{
            const {description, user_id, tags = []} = req.body;
            res.utilized = false

            postValidation.string(description, res, "Descrição", 2)

            if (res.utilized == false) {
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
                res.statusCode = 404;
                res.json({status: false, msg: "Nenhum post foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async delete (req, res) {
        try {
            const { id } = req.params;
            const post = await Post.findById(id)

            if (post.length > 0) {
                const {img} = await Post.findImage(id)
                
                if (img.length > 0)
                    unlink(imgPath + '/' + img[0].name, (err) => {})

                await Post.delete(id)

                res.statusCode = 200;
                res.json({status: true, msg: "Post deletado com sucesso"});
            } else {
                res.statusCode = 404;
                res.json({status: false, msg: "Nenhum post foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async findByUserId (req, res) {
        try {
            const {id} = req.params;
            const newPosts = [];
            const {users: user} = await User.findById(id);

            if(user.length > 0) {
                const posts = await Post.findByUserId(id);
                
                if (posts.length > 0) {
                    for (const post of posts) {
                        const tags = await Post.findTags(post.id);
                        const newTags = [];
                        for (const tag of tags) {
                            newTags.push(tag.tag)
                        }
                        const currentPost = {
                            ...post,
                            tags: newTags
                        }
                        newPosts.push(currentPost);
                    }

                    res.statusCode = 200;
                    res.json({status: true, posts: newPosts});
                }else {
                    res.statusCode = 404;
                    res.json({status: false, msg: "Este usuário não possui posts"});
                }
            } else {
                res.statusCode = 404;
                res.json({status: false, msg: "Usuario não foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async update (req, res) {
        try {
            const {id} = req.params;
            const {description, tags = []} = req.body;
            res.utilized = false

            postValidation.string(description, res, "Descrição", 2)

            if (res.utilized == false) {
                const post = await Post.findById(id)
                if (post.length > 0) {
                    const data = {
                        id: post[0].id,
                        description: post[0].description,
                        likes: post[0].likes,
                        user_id: post[0].user_id
                    }

                    if (description != undefined) {
                        data.description = description
                    }

                    await Post.update(data, id)
                    if ( tags.length > 0) {
                        await Post.tag_postDelete(id);
                        for (const tag of tags) {
                            const tagExists = await Tag.findOne(tag);
                            let tagId = 0;
                            if(tagExists.length != 0){
                                tagId = tagExists[0].id;
                            }else{
                                const tagData = { tag }
                                tagId = await Tag.create(tagData);
                            }
                            const tag_postData = {
                                post_id: post[0].id,
                                tag_id: tagId
                            }
                            await Post.tag_postInsert(tag_postData);
                        }
                    }

                    if(req.file != undefined) {
                        const {img} = await Post.findImage(id);
                        
                        const image = {
                            name: req.file.filename,
                            url: process.env.FILES_URL + req.file.filename,
                            post_id: id
                        }

                        if (img.length > 0) { 
                            unlink(imgPath + '/' + img[0].name, (err) => {})
                            await Post.updateImage(image, id);
                        } else {
                            await Post.insertImage(image)
                        }
                    }

                    res.statusCode = 200;
                    res.json({status: true, msg: "Post atualizado com sucesso"});
                } else {
                    res.statusCode = 404;
                    res.json({status: false, msg: "Post não foi encontrado"});
                }
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async userDidLikePost (req, res) {
        try {
            const {user_id, post_id} = req.body
            const post = await Post.findById(post_id)

            if(post.length > 0) {
                const {users: user} = await User.findById(user_id)

                if(user.length > 0) {
                    const userPost = await Post.didUserLikePost(user_id, post_id)

                    if(userPost.length == 0) {
                        await Post.userDidLikePost(user_id, post_id)
                        res.statusCode = 200;
                        res.json({status: true, msg: "Usuário deu like"});
                    } else {
                        await Post.userRemoveLike(user_id, post_id)
                        res.statusCode = 200;
                        res.json({status: true, msg: "Usuário removeu like"});
                    }
                } else {
                    res.statusCode = 404;
                    res.json({status: false, msg: "Usuário não foi encontrado"});
                }
            } else {
                res.statusCode = 404;
                res.json({status: false, msg: "Post não foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }
    
    async didUserLikePost (req, res) {
        try {
            const {user_id, post_id} = req.body
            const post = await Post.findById(post_id)

            if(post.length > 0) {
                const {users: user} = await User.findById(user_id)

                if(user.length > 0) {
                    const userPost = await Post.didUserLikePost(user_id, post_id)

                    if(userPost.length > 0) {
                        res.statusCode = 200;
                        res.json({status: true, msg: "Usuário deu like"});
                    } else {
                        res.statusCode = 200;
                        res.json({status: false, msg: "Usuário não deu like"});
                    }
                } else {
                    res.statusCode = 404;
                    res.json({status: false, msg: "Usuário não foi encontrado"});
                }
            } else {
                res.statusCode = 404;
                res.json({status: false, msg: "Post não foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async postLikes (req, res) {
        try {
            const {id} = req.params
            const post = await Post.findById(id)

            if(post.length > 0) {
                const postLikes = await Post.postLikes(id)
                
                res.statusCode = 200;
                res.json({status: true, likes: postLikes.length});
            } else {
                res.statusCode = 404;
                res.json({status: false, msg: "Post não foi encontrado"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }
}

module.exports = new PostController();