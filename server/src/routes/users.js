const express = require('express');
const { getUserList, createUser, updateUser, deleteUsersByIds, getUserById } = require('../services/users');

const router = express.Router();

// MiddleWare
router.use('/', (req, res, next) => {
    console.log(`Call to: ${req.method} ...${req.originalUrl}`);
    next();
});

router.get('/', async (req, res, next) => {
    try {
        const users = await getUserList();
        res.json(users);
    } catch (error) {
        console.error(`Failed on ${req.method}:${req.originalUrl} with error: ${error.message}`);
        res.status(500).send(error);
    }
});

router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userData = await getUserById(userId);
        res.json(userData);
    } catch (error) {
        console.error(`Failed on ${req.method}:${req.originalUrl} with error: ${error.message}`);
        res.status(500).send(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.json(user);
    } catch (error) {
        console.error(`Failed on ${req.method}:${req.originalUrl} with error: ${error.message}`);
        res.sendStatus(500);
    }
});

router.put('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userData = req.body;
        const updatedUser = await updateUser(userId, userData);
        res.json(updatedUser);
    } catch (error) {
        console.error(`Failed on ${req.method}:${req.originalUrl} with error: ${error.message}`);
        res.sendStatus(500);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const userIds = req.body;
        const deletedIds = await deleteUsersByIds(userIds);
        res.json(deletedIds);
    } catch (error) {
        console.error(`Failed on ${req.method}:${req.originalUrl} with error: ${error.message}`);
        res.sendStatus(500);
    }
});

module.exports = router;
