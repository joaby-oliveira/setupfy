const database = require("../database/database");

class Comment {
	async create (data) {
		const comment = await database.insert(data).table("comments")

		return comment
	}

	async findAll (postId) {
		const comments = await database.select().table("comments").where({post_id: postId})

		return comments
	}

	async findById (id) {
		const comment = await database.select().table("comments").where({id: id})

		return comment
	}

	async delete (id) {
		const comment = await database.delete().table("comments").where({id: id})

		return comment
	}

	async update (data, id) {
		const comment = await database.update(data).table("comments").where({id: id})

		return comment
	}
}

module.exports = new Comment();