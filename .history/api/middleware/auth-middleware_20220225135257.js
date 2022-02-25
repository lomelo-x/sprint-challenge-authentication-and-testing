const User = require('../users/user-model');

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
}

const checkUsernameExists = async (req, res, next) => {
	try {
		const [user] = await User.findBy({ username: req.body.username });
		if (!user) {
			next({
				status: 401,
				message: 'Invalid credentials',
			});
		} else {
			req.user = user;
			next();
		}
	} catch (error) {
		next(error);
	}
};

function checkUserInput (req, res, next) {
	if (!req.body.password || req.body.user) {
		next({ status: 422, message: 'Password must be longer than 3 chars' });
	} else {
		next();
	}
}
else if (!req.body.username || !req.body.password) {
    next({
        status: 422,
        message: 'username and password required',
    });
}

module.exports = {
	checkUsernameFree,
	checkUsernameExists,
};
