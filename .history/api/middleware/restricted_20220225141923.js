const { JWT_SECRET } = require('../top-secret');
const jwt = require('jsonwebtoken');

module.exports = {
	/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
  function restricted(req, res, next) {
	const token = req.header.authorization;
	if (!token) {
		return next({
			status: 401,
			message: 'token required',
		});
	}
	jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
		if (error) {
			next({
				status: 401,
				message: 'invalid token',
			});
		} else {
			req.decodedToken = decodedToken;
			next();
		}
	});
};
}