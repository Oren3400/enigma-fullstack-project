import { ADD_USER, FETCH_USERS, DELETE_USERS, UPDATE_USER } from '../actions/users';

const initialState = {
    users: [],
    firstLoaded: false,
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.users,
                firstLoaded: true,
            };

        case UPDATE_USER:
        case DELETE_USERS:
        case ADD_USER:
            return {
                ...state,
                users: action.users,
            };

        default:
            return state;
    }
};

export default stateManagement;
