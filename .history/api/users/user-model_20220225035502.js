const db = require('../../data/db-config.js');


async function add({ username, password }) {
	let created_user_id;
	await db.transaction(async (trx) => {
		const [user_id] = await trx('users').insert({
			username,
			password,
		});
		created_user_id = user_id;
	});
	return findById(created_user_id);
}

function findById(user_id) {
    retrun rs')
      .join('roles', 'users.role_id', 'roles.role_id')
      .select('user_id', 'username', 'role_name')
      .where('users.user_id', user_id).first()
  }

module.exports = {
    add,
}