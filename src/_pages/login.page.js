import React, { useState } from 'react';
import { withFirebase, SessionContext } from '../_contexts';
import { history } from '../_config';
import { Redirect } from 'react-router-dom';
import { DASHBOARD_ROUTE } from './dashboard.page';

export const LOGIN_ROUTE = '/login';

function LoginPageComponent({ firebase }) {

    const [error, setError] = useState(null);

    const login = event => {
        event.preventDefault();
        const form = event.target;
        const { email, password } = form;

        firebase.auth.signInWithEmailAndPassword(email.value, password.value)
            .then(response => {
                history.push(DASHBOARD_ROUTE);
            })
            .catch(e => {
                setError(e);
            });
    }
    return (
        <SessionContext.Consumer>
            {
                user => {
                    return user ? <Redirect to={DASHBOARD_ROUTE} /> :
                        <div className="LoginPage">
                            <div className="flex h-screen justify-center items-center">
                                <form className="w-64" onSubmit={login}>
                                    <input className="w-full py-2 px-4 block mb-3 border focus:outline-none" placeholder="Email" type="email" name="email" />
                                    <input className="w-full py-2 px-4 block mb-3 border focus:outline-none" placeholder="Password" type="password" name="password" />
                                    {error && <span className="text-red-500 mb-3 block text-center">{error.message}</span>}
                                    <button className="px-4 py-2 bg-orange-500 rounded text-white mx-auto block focus:outline-none" type="submit">LOGIN</button>
                                </form>
                            </div>
                        </div>
                }
            }
        </SessionContext.Consumer>
    )
}

export const LoginPage = withFirebase(LoginPageComponent);