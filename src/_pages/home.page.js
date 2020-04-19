import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const HOMEPAGE_ROUTE = '/';

const randomUnsplash = () => {
    const splashes = [
        "https://images.unsplash.com/photo-1431512284068-4c4002298068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        "https://images.unsplash.com/photo-1562839492-20a189fafbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1422564030440-1ecae6e21f67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "https://images.unsplash.com/photo-1543096757-a42d5d384910?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80"
    ]

    return splashes[Math.floor(Math.random() * splashes.length)];
}

export function HomePage({ blogs, toggleSidebar }) {

    const [query, setQuery] = useState('');
    return (
        <div className="HomePage">
            <div className="main-content fade-in">
                <div className="container pt-5">
                    <div className="my-5 text-center">
                        <input
                            className="blog-search rounded border px-4 py-2 focus:outline-none"
                            placeholder="Search blogs..."
                            value={query} onChange={event => setQuery(event.target.value)} />
                    </div>
                    {/* <h1 className="my-4 text-2xl text-center font-bold">{process.env.REACT_APP_NAME}</h1> */}
                    <div className="blog-card-holder">
                        {
                            blogs.length === 0 ?
                                <div className="text-center py-5">Nothing here!</div> :
                                (query.trim().length === 0 ? blogs.filter(b => b.isPublished) : blogs.filter(b => b.isPublished && b.title.toLowerCase().includes(query.trim().toLowerCase()))) // filtering blogs if filter not empty
                                    .map((blog, i) => {
                                        const image = blog.image || randomUnsplash();
                                        return (
                                            <Link className="blog-card" key={i} to={blog.url}>
                                                <div className="blurred-bg" style={{ backgroundImage: 'url(' + image + ')' }}></div>
                                                <div className="blog-image">
                                                    <img
                                                        src={image}
                                                        alt={blog.title} />
                                                </div>
                                                <div className="blog-title">
                                                    {blog.title}
                                                </div>
                                            </Link>
                                        )
                                    })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
