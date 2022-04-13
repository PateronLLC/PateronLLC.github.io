import db from '../models/dbModel.js';

const groupController = {};

groupController.newGroup = (req, res, next) => {
  if (typeof req.body?.groupName !== 'string' || typeof req.body?.userId !== 'string') {
    return next({
      log: "Error: your create group request does't have a valid userId (number) or name (string)",
      status: 400,
      message: {
        err:
          "Error: your create group request does't have a valid userId (number) or name (string)",
      },
    });
  }
  (async () => {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      const createGroupText = `INSERT INTO groups(group_name) VALUES ($1) returning _id`;
      const { groupName, userId } = req.body;
      const createGroupParams = [groupName];
      let dbRes = await client.query(createGroupText, createGroupParams);
      const groupId = dbRes.rows[0]._id;
      const addUserText = `INSERT INTO users_groups(group_id, user_id) VALUES ($1, $2) returning *`;
      const addUserParams = [groupId, parseInt(userId)];
      let dbResTwo = await client.query(addUserText, addUserParams);
      await client.query('COMMIT');
      res.locals = dbResTwo.rows[0];
      console.log('Created new group:', res.locals);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
      return next();
    }
  })().catch((e) =>
    console.error('Error: error creating new group and adding user to group in DB', e.stack),
  );
};

//expects nothing
groupController.getGroups = (req, res, next) => {};

//expects a group name and userid of user
groupController.joinGroup = (req, res, next) => {};

//expects a group name/id
groupController.getGroupUsers = (req, res, next) => {};

export default groupController;
