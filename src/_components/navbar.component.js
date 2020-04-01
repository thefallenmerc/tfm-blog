import React from 'react';
import { Link } from 'react-router-dom';
import { HOMEPAGE_ROUTE } from '../_pages';
import { withFirebase } from '../_contexts';

export function NavbarComponent({ toggleSidebar, firebase }) {
    return (
        <div className="Navbar">
            <Link to={HOMEPAGE_ROUTE} className="text-2xl py-2 px-4 font-bold text-orange-500 title">
                {process.env.REACT_APP_NAME}
            </Link>

            <div>
                {
                    firebase.auth.currentUser &&
                    <button className="text-orange-500 uppercase focus:outline-none"
                        onClick={() => {
                            firebase.auth.signOut();
                        }}>Logout</button>
                }
                <button
                    className="sidebar-toggle cursor-pointer hover:bg-gray-200 rounded-full text-2xl font-bold text-orange-500 focus:outline-none"
                    onClick={toggleSidebar}>&#x22EE;</button>
            </div>
        </div>
    )
}

export const Navbar = withFirebase(NavbarComponent);