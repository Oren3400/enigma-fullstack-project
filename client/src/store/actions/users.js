import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USERS = 'DELETE_USERS';

export const addUser = (userData) => {
    // userData = {name, email}
    return async (dispatch, getState) => {
        const response = await axios.post('/users', userData).catch((error) => {
            console.error(error);
            return { data: null };
        });

        const user = response.data;
        if (user) {
            const store = getState();
            const users = store.usersReducer.users;

            users.push(user);

            dispatch({ type: ADD_USER, users });
        }
    };
};

export const updateUserData = (userId, userData) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put(`/users/${userId}`, userData);
            const user = response.data;
            if (!user) return;

            const store = getState();
            const users = store.usersReducer.users;

            const userIndex = users.findIndex((u) => u.id === user.id);
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...user };
            }

            dispatch({ type: UPDATE_USER, users });
        } catch (e) {
            console.error(e);
        }
    };
};

export const deleteUsersByIds = (userIds) => {
    return async (dispatch, getState) => {
        let deletedIds = [];
        try {
            const response = await axios({
                method: 'DELETE',
                url: '/users',
                data: userIds,
            });
            deletedIds = response.data;

            const store = getState();
            const users = store.usersReducer.users;
            const filteredUsers = users.filter((user) => deletedIds.includes(user.id) === false);

            dispatch({ type: DELETE_USERS, users: filteredUsers });
        } catch (e) {
            console.error(e);
        }
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        let users = [];
        try {
            const response = await axios.get('/users');
            users = response.data;
        } catch (e) {
            console.error(e);
        }

        dispatch({ type: FETCH_USERS, users });
    };
};
