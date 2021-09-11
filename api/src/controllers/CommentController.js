const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")
const utils = require('../utils');

const commentValidation = {
    string: (string, length, res, value) => {
        if (string === undefined || utils.isEmpty(string) || !utils.isValidLength(string, length)) {
            res.statusCode = 406
            res.json({
              status: false,
              msg: 'O campo ' + value + ' deve ter pelo menos ' + length + ' caracteres. '
            })
            res.utilized = true
        }
        if (utils.isDoubleSpaced(string) && res.utilized == false) {
            res.statusCode = 406
            res.json({
              status: false,
              msg: 'O campo ' + value + ' não deve ter mais de um espaço entre as palavras'
            })
            res.utilized = true
      }
    }
}

class CommentController {
    async create (req, res) {
        try {
            const { user_id, post_id, content } = req.body;
            res.utilized = false;

            commentValidation.string(content, 2, res, "Comentário");

            if(res.utilized == false){
                const {users} = await User.findById(user_id)
                if (users.length != 0){
                    const post = await Post.findById(post_id)
                    if (post.length != 0){

                        const data = {
                            user_id,
                            post_id,
                            content
                        }

                        await Comment.create(data)

                        res.statusCode = 201;
                        res.json({status: true, msg: "Comentário criado com sucesso"});
                    }else {
                        res.statusCode = 406;
                        res.json({status: false, msg: "Post não foi encontrado na base de dados"});
                    }
                }else {
                    res.statusCode = 406;
                    res.json({status: false, msg: "Usuário não foi encontrado na base de dados"});
                }
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Não foi possível adicionar o comentário: " + err});
        }
    }

    async findAll (req, res) {
        try{
            const { postId } = req.params;
            const comments = await Comment.findAll(postId);

            res.statusCode = 200;
            res.json({status: true, comments});
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async delete (req, res) {
        try{
            const { id } = req.params;
            await Comment.delete(id);

            res.statusCode = 200;
            res.json({status: true, msg: "Comentário deletado com sucesso"});
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Erro: " + err});
        }
    }

    async update (req, res) {
        try {
            const { content } = req.body;
            const { id } = req.params;
            res.utilized = false;

            const comment = await Comment.findById(id)
            console.log(comment.length)

            if(comment.length != 0){

                commentValidation.string(content, 2, res, "Comentário");

                if(res.utilized == false){
                    const data = {
                        id: id,
                        user_id: comment[0].user_id,
                        post_id: comment[0].post_id,
                        content
                    }

                    console.log(data)

                    await Comment.update(data, id)

                    res.statusCode = 201;
                    res.json({status: true, msg: "Comentário atualizada com sucesso"});
                }
            }else {
                res.statusCode = 406;
                res.json({status: false, msg: "Comentário não exite na base de dados"});
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({status: false, msg: "Não foi possível adicionar o comentário: " + err});
        }
    }
}

module.exports = new CommentController();