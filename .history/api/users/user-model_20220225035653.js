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
	/**
      You will need to join two tables.
      Resolves to an ARRAY with all users.
  
      [
        {
          "id": 1,
          "username": "bob",
          "role_name": "admin"
        },
        {
          "id": 2,
          "username": "sue",
          "role_name": "instructor"
        }
      ]
     */
	return db('users')
		.join('roles', 'users.role_id', 'roles.role_id')
		.select('id', 'username', 'password', 'role_name');
}

function findBy(filter) {
	/**
      You will need to join two tables.
      Resolves to an ARRAY with all users that match the filter condition.
  
      [
        {
          "id": 1,
          "username": "bob",
          "password": "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
          "role_name": "admin",
        }
      ]
     */
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
