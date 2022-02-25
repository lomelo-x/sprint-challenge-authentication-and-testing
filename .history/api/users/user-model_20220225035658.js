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

function find() {
    /**
      You will need to join two tables.
      Resolves to an ARRAY with all users.
  
      [
        {
          "user_id": 1,
          "username": "bob",
          "role_name": "admin"
        },
        {
          "user_id": 2,
          "username": "sue",
          "role_name": "instructor"
        }
      ]
     */
      return db('users')
      .join('roles', 'users.role_id', 'roles.role_id')
      .select('user_id', 'username', 'password', 'role_name')
    }
  
  function findBy(filter) {
   
      return db('users')
      .join('roles', 'users.role_id', 'roles.role_id')
      .select('user_id', 'username', 'password', 'role_name')
      .where(filter)
  }
function findById(user_id) {
	return db('users')
		.select('user_id', 'username')
		.where('users.user_id', user_id)
		.first();
}

module.exports = {
	add,
};
