import React from 'react';
import { Sidebar } from '../_components';

export const HOMEPAGE_ROUTE = '/';

export function HomePage({ blogs, toggleSidebar }) {
    return (
        <div className="HomePage">
            <Sidebar blogs={blogs} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <div className="container">
                    <div className="py-2 px-4">
                        <img alt="" src="https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1393&q=80" />
                    </div>
                </div>
            </div>
        </div>
    )
}
