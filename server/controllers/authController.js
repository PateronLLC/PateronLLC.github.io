// import db from '../models/dbModel.js';

const authController = {};

authController.authenticate = (req, res, next) => {
  console.log('Authenticating user', req.body);
  return next();
};

export default authController;
