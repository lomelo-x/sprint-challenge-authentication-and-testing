const { JWT_SECRET } = require("../top-secret");
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	next();
	/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
	const token = req.header.authorization;
	if (!token) {
		return next({
			status: 401,
			message: 'token required',
		});
	}
  
};
