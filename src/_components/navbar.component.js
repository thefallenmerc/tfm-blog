import React from 'react';
import { Link } from 'react-router-dom';
import { HOMEPAGE_ROUTE, DASHBOARD_ROUTE } from '../_pages';
import { withFirebase } from '../_contexts';

export function NavbarComponent({ toggleSidebar, firebase }) {
    return (
        <div className="Navbar">
            <Link to={HOMEPAGE_ROUTE} className="text-2xl py-2 px-4 font-bold title">
                {process.env.REACT_APP_NAME}
            </Link>

            <div>
                {
                    firebase.auth.currentUser &&
                    <>
                        <Link className="uppercase focus:outline-none mx-2"
                            to={DASHBOARD_ROUTE}>New Post</Link>
                        <button className="uppercase focus:outline-none mx-2"
                            onClick={() => {
                                firebase.auth.signOut();
                            }}>Logout</button>
                    </>
                }
                <button
                    className="sidebar-toggle cursor-pointer shadowed rounded-full text-2xl font-bold focus:outline-none"
                    onClick={toggleSidebar}>&#x22EE;</button>
            </div>
        </div>
    )
}

export const Navbar = withFirebase(NavbarComponent);