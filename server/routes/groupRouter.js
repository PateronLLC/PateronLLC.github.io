import groupController from '../controllers/groupController.js';
import authController from '../controllers/authController.js';

import express from 'express';

const groupRouter = express.Router();

// Create group with an initial user
groupRouter.post('/', authController.authenticate, groupController.newGroup, (req, res, next) => {
  return res.status(200).json(res.locals);
});

// Find a groin
groupRouter.get('/', groupController.getGroups, (req, res, next) => {
  return res.status(200).json(res.locals);
});

// Join a groin
groupRouter.post(
  '/join',
  authController.authenticate,
  groupController.joinGroup,
  (req, res, next) => {
    return res.status(200).json(res.locals);
  },
);

// Get users in a group
groupRouter.get('/users', groupController.getGroupUsers, (req, res, next) => {
  return res.status(200).json(res.locals);
});

export default groupRouter;
