import React from 'react';
import { Sidebar, Remarkable, Loader } from '../_components';

export const POSTPAGE_ROUTE = '/:url?';

export function PostPage({ blogs, match }) {

    // get url of the blog
    const { url } = match.params;

    const blog = blogs.find(b => b.url === url);

    return (
        <div className="PostPage">
            <div className="main-content">
                <div className="container">
                    {
                        blog ?
                            <Remarkable blog={blog} /> :
                            <Loader />
                    }
                </div>
            </div>
        </div>
    )
}