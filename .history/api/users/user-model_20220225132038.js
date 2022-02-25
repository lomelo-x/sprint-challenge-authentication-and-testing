const db = require('../../data/dbConfig');

async function add({ username, password }) {
	let created_user_id;
	await db.transaction(async (trx) => {
		const [uid] = await trx('users').insert({
			username,
			password,
		});
		created_user_id = uid;
	});
	return findById(created_user_id);
}

function find() {
	return db('users').select('uid', 'username', 'password');
}

function findBy(filter) {
	return db('users').select('uid', 'username', 'password').where(filter);
}
function findById(uid) {
	return db('users')
		.select('uid', 'username')
		.where('users.uid', uid)
		.first();
}

module.exports = {
	add,
	find,
	findBy,
	findById,
};
