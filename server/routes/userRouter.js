import authController from '../controllers/authController.js';
import userController from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/newUser', userController.newUser, (req, res, next) => {
	return res.status(200).json(res.locals);
});

userRouter.post('/login', authController.login, (req, res, next) => {
	return res.status(200).json(res.locals);
});

export default userRouter;
