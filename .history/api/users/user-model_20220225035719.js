const db = require('../../data/db-config.js');

async function add({ username, password }) {
	let created_user_id;
	await db.transaction(async (trx) => {
		const [id] = await trx('users').insert({
			username,
			password,
		});
		created_user_id = id;
	});
	return findById(created_user_id);
}

function find() {
	return db('users').select('id', 'username', 'password', 'role_name');
}

function findBy(filter) {
	return db('users')
		.join('roles', 'users.role_id', 'roles.role_id')
		.select('id', 'username', 'password', 'role_name')
		.where(filter);
}
function findById(id) {
	return db('users').select('id', 'username').where('users.id', id).first();
}

module.exports = {
	add,
};
