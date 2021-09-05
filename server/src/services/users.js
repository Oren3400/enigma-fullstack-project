const { db } = require('../db');

module.exports.getUserList = async () => {
    const users = await db
        .select(
            'users.id as id',
            'users.email as email',
            'users.name as name',
            'users.lastConnection as lastConnection'
        )
        .from('users');

    return users;
};

const getUserById = async (userId) => {
    const query = db
        .select(
            'users.id as id',
            'users.email as email',
            'users.name as name',
            'users.lastConnection as lastConnection'
        )
        .from('users')
        .where('id', userId)
        .first();

    const user = await query;

    return user;
};
module.exports.getUserById = getUserById;

module.exports.createUser = async (userData) => {
    const [userId] = await db.from('users').insert([userData]);
    const user = await getUserById(userId);
    return user;
};

module.exports.updateUser = async (userId, userData) => {
    if (userData.hasOwnProperty('lastConnection')) {
        userData.lastConnection = new Date(userData.lastConnection);
    }
    delete userData.id;

    const updatedSize = await db.from('users').where('id', userId).update(userData);

    if (updatedSize === 0) return null;

    const user = await getUserById(userId);
    return user;
};

module.exports.deleteUsersByIds = async (userIds) => {
    if (!userIds.length) return [];

    const deletedSize = await db.from('users').whereIn('id', userIds).del();
    return userIds.length === deletedSize ? userIds : [];
};
