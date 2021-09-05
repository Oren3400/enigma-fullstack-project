import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { UserListScreen } from './UserList';
import { UserFormScreen } from './UserForm';

export const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/users">
                <UserListScreen />
            </Route>

            <Route path="/users/:userId">
                <UserFormScreen />
            </Route>

            <Redirect to="/users" />
        </Switch>
    );
};
