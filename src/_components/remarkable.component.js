import React, { useEffect } from 'react';
import { Remarkable as Parser } from 'remarkable';

const md = new Parser();

export function Remarkable({ blog }) {
    useEffect(() => {

        window.Prism.highlightAll();
    }, [blog.content]);

    return (
        <div className="Remarkable">
            <h1 className="title py-2 px-4 mb-3">{blog.title || 'Untitled'}</h1>
            <div className="py-2 px-4" dangerouslySetInnerHTML={{ __html: md.render(blog.content) }}></div>
        </div>
    )
}