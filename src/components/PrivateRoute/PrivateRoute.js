import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
    const { isAdminLogged } = rest.store
    return <Route {...rest} render={(props) => {
        return isAdminLogged
            ? <Component {...props} />
            : <Redirect to="/login" />
    }} />
}