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
	if (!req.body.password || req.body.username) {
		next({
            status: 422,
        message: 'username and password required',
        });
	} else {
		next();
	}
}

}

module.exports = {
	checkUsernameFree,
	checkUsernameExists,
};
