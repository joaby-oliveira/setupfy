const database = require("../database/database");

class Tag {
    async create(data){
        const tag = await database.insert(data).table("tags");
        return tag[0]
    }

    async findOne(tagName){
        const tag = await database.select().table("tags").where({tag: tagName});
        return tag
    }

    async findAll(){
        const tags = await database.select().table("tags");
        return tags
    }
}

module.exports = new Tag();