async function add({ username, password }) {
	let created_user_id;
	await db.transaction(async (trx) => {
		let role_id_to_use;
		const [role] = await trx('roles').where('role_name', role_name);
		if (role) {
			role_id_to_use = role.role_id;
		} else {
			const [role_id] = await trx('roles').insert({ role_name: role_name });
			role_id_to_use = role_id;
		}
		const [id] = await trx('users').insert({
			username,
			password,
			role_id: role_id_to_use,
		});
		created_user_id = id;
	});
	return findById(created_user_id);
}
