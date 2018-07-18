import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const redirect = rest.location.pathname;

    return (
        <Route {...rest} render={(props) => {
            return (
                rest.loggedIn
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: redirect
                    }} />
            )}
        } />
    );
}

export default withRouter(PrivateRoute);