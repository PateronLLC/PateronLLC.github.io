import db from '../models/dbModel.js';

const authController = {};

authController.authenticate = (req, res, next) => {
  return next();
};

export default authController;
