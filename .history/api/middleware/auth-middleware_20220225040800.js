const User = require('../users/user-model'

async function checkUsernameFree(req, res, next) {
	try {
		const users = await User.findBy({ username: req.body.username });
		if (!users.length) {
			next();
		} else {
			next({ status: 422, message: 'Username taken' });
		}
	} catch (error) {
		next(error);
	}
})

module.exports = {
    checkUsernameFree
}