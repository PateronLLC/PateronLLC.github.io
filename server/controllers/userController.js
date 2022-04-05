import db from '../models/dbModel.js';

const userController = {};

userController.newUser = (req, res, next) => {
  if (!('username' in req.body) && !('password' in req.body)) {
    return next({
      log: 'New user request properties do not have username and password',
      status: 400,
      message: {
        err: 'New user request properties do not have username and password',
      },
    });
  }
  const queryText = 'insert into users(username, password) values($1, $2) returning *';
  const { username, password } = req.body;
  const queryOptions = [username, password];
  db.query(queryText, queryOptions)
    .then((data) => {
      console.log('got to db.query', data.rows);
      if (!data.rows.length) throw new Error('Empty response');
      res.locals = data.rows[0];
      console.log('Created new user:', res.locals);
      return next();
    })
    .catch((error) => {
      return next({
        log: 'Error in userController.createUser: Failed to create new user',
        status: 400,
        message: {
          err: 'Error in userController.createUser: Failed to create new user',
        },
      });
    });
};

export default userController;
