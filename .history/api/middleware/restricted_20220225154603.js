const User = require('../users/user-model');

const { JWT_SECRET } = require('../top-secret');
const jwt = require('jsonwebtoken');

async function checkUsernameFree(req, res, next) {
	try {
		const users = await User.findBy({ username: req.body.username });
		if (!users.length) {
			next();
		} else {
			next({ status: 422, message: 'username taken' });
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
				message: 'invalid credentials',
			});
		} else {
			req.user = user;
			next();
		}
	} catch (error) {
		next(error);
	}
};

function checkUserInput(req, res, next) {
	if (!req.body.username || !req.body.password) {
		next({
			status: 422,
			message: 'username and password required',
		});
	} else {
		next();
	}
}
/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

function restricted(req, res, next) {
	const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: 'token invalid'})
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  } else {
    next({ status: 401, message: 'token required'})
  }
};

module.exports = {
	checkUsernameFree,
	checkUsernameExists,
	checkUserInput,
	restricted,
};
