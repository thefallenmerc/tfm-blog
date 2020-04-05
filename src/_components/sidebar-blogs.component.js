import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export
    function Sidebar({ blogs, to = url => url, activeUrl, toggleSidebar = () => {} }) {
    const [filter, setFilter] = useState('');
    return (
        <div className="Sidebar border border-t-0 border-l-0 border-b-0">
            <input
                className="px-4 py-2 border border-t-0 border-l-0 border-r-0 focus:outline-none block w-full"
                placeholder="Type to filter"
                onChange={e => { setFilter(e.target.value) }} />
            {
                (
                    filter.trim() ?
                        blogs.filter(
                            b => b.title.trim() && b.title.toLowerCase().includes(filter.toLowerCase())
                        ) :
                        blogs.filter(b => b.title.trim())
                ).map((blog, index) => (
                    <Link
                        to={to(blog.url)}
                        className={
                            activeUrl === blog.url ?
                                "block px-4 py-2 theme-text font-bold cursor-pointer" :
                                "block px-4 py-2 hover:font-bold theme-text cursor-pointer"
                        }
                        onClick={toggleSidebar}
                        key={index}>
                        {blog.title ?? 'Untitled Blog'}
                    </Link>
                ))
            }
        </div>
    )
}