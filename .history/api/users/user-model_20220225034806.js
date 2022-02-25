async function add({ username, password }) {
	let created_user_id;
	await db.transaction(async (trx) => {
		const [id] = await trx('users').insert({
			username,
			password,
			role_id: role_id_to_use,
		});
		created_user_id = id;
	});
	return findById(created_user_id);
}
