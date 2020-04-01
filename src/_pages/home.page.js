import React from 'react';
import { Sidebar, Remarkable } from '../_components';

export const HOMEPAGE_ROUTE = '/:url?';

export function HomePage({ blogs, match }) {

    // get url of the blog
    const { url } = match.params;

    const blog = blogs.find(b => b.url === url);

    return (
        <div className="HomePage">
            <Sidebar blogs={blogs} />
            <div className="main-content">
                <div className="text-2xl py-2 px-4 mb-3 font-bold text-orange-500">TFM - TECH</div>
                <div className="container">
                    {
                        blog ?
                            <Remarkable blog={blog} /> :
                            <HomePageContent />
                    }
                </div>
                <div className="text-gray-500 text-center p-4">Created by Shubham Singh Chahar</div>
            </div>
        </div>
    )
}

function HomePageContent() {
    return (
        <div className="py-2 px-4">
            <img alt="" src="https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1393&q=80" />
        </div>
    );
}
