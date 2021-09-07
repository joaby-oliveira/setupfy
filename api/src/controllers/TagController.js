const Tag = require('../models/Tag');

class TagController{
    async create(req, res){
        try{
            const {tag} = req.body;
            
            await Tag.create(tag);

            res.statusCode = 201;
            res.json({status: true, msg: "Tag inserido!"});

        }catch(err){
            res.statusCode = 406;
            res.json({status: false, msg: "Tag não pode ser inserido " + err});
        }
    }
    
    async findOne(req, res){
        try{
            const {tag} = req.params;

            const result = await Tag.findOne(tag);

            console.log(result)

            res.statusCode = 200;
            res.json({status: true, tag: result});

        }catch(err){
            res.statusCode = 406;
            res.json({status: false, msg: "Error: " + err});
        }
    }
}

module.exports = new TagController();