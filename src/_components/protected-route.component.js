import React from 'react';
import { withSession } from '../_contexts';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { LOGIN_ROUTE } from '../_pages';
import { Loader } from './loader.component';

function ProtectedRouteComponent(props) {
    // check if actually auth check is complete and then only send user to redirection
    if (!props.isAuthChecked) {
        return <Route {...props}><div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: withRouter,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Loader />
        </div></Route>
    }
    return (
        props.user ?
            <Route {...props} /> :
            <Redirect to={LOGIN_ROUTE} />
    )
}

export const ProtectedRoute = withSession(ProtectedRouteComponent)