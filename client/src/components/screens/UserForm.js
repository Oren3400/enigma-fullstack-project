import React, { useEffect, useState } from 'react';
import UserForm from '../forms/user-form';
import './UserForm.scss';
import { useParams, useHistory } from 'react-router-dom';
import { userActions } from '../../store/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export const UserFormScreen = (props) => {
    const { userId } = useParams();
    const [userData, setUserData] = useState({ name: '', email: '' });

    const history = useHistory();
    const isNewUser = userId === 'new';
    const dispatch = useDispatch();

    function onAddSubmitHandler(userData) {
        dispatch(userActions.addUser(userData));
        history.goBack();
    }

    function onEditSubmitHandler(userData) {
        dispatch(userActions.updateUserData(+userId, userData));
        history.goBack();
    }

    useEffect(() => {
        if (userId !== 'new') {
            axios
                .get(`/users/${+userId}`)
                .then((response) => setUserData(response.data))
                .catch((err) => console.error(err));
        }
    }, [userId]);

    return (
        <div id="user-form-wrapper">
            <div id="user-form-container">
                {isNewUser ? (
                    <UserForm onSubmitHandler={onAddSubmitHandler} isNewUser={true} userData={userData} />
                ) : (
                    <UserForm onSubmitHandler={onEditSubmitHandler} isNewUser={false} userData={userData} />
                )}
            </div>
        </div>
    );
};
