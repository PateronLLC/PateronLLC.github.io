import db from '../models/dbModel.js';

const authController = {};

authController.authenticate = (req, res, next) => {
	// Checking cookie validity
	console.log('Attempting to authenticating user', req.body);
	if (req.cookies?.userId) return next();
	else
		return next({
			log: 'Error: user is not authenticated',
			status: 400,
			message: {
				err: 'Error: user is not authenticated',
			},
		});
};

authController.login = (req, res, next) => {
	// username will be in req.body, or valid cookie will be present (if user is already logged in), otherwise, invalid authentication attempt
	const { username, password } = req.body;
  console.log(`Attempting to login with user ${username} and password ${password}`);
	const queryString = `SELECT * FROM users WHERE username=$1 and password=$2`;
	const queryParams = [username, password];

	// Deal with login attempt
	db.query(queryString, queryParams)
		.then((data) => {
			if (!data.rows.length) throw new Error('Invalid login attempt');
			else {
				// set cookies here
				res.cookie('userId', data.rows[0]._id);
				res.cookie('username', data.rows[0].username);
        res.locals = data.rows[0];
			}
			return next();
		})
		.catch((error) => {
			return next({
				log: 'Error in authController.login: login attempt failed',
				status: 400,
				message: {
					err: 'Error in authController.login: login attempt failed',
				},
			});
		});
};
export default authController;
