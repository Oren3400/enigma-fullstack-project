import React, { useEffect } from 'react';
import UserTable from '../tables/user-table';
import './UserList.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/actions';

export const UserListScreen = (props) => {
    const { users, firstLoaded } = useSelector((store) => ({
        users: store.usersReducer.users,
        firstLoaded: store.usersReducer.firstLoaded,
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    function onAddHandler() {
        history.push(`/users/new`);
    }

    function onEditHandler(userId) {
        history.push(`/users/${userId}`);
    }

    function onDeleteHandler(deletedUserIds) {
        dispatch(userActions.deleteUsersByIds(deletedUserIds));
    }

    useEffect(() => {
        if (!firstLoaded) {
            dispatch(userActions.fetchUsers());
        }
    }, [dispatch, firstLoaded]);

    return (
        <div id="user-table-wrapper">
            <div id="user-table-container">
                <UserTable
                    rows={users}
                    onAddHandler={onAddHandler}
                    onEditHandler={onEditHandler}
                    onDeleteHandler={onDeleteHandler}
                />
            </div>
        </div>
    );
};
