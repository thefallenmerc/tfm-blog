import React, { useEffect } from 'react';
import { Remarkable as Parser } from 'remarkable';

const md = new Parser();

var entities = {
    'amp': '&',
    'apos': '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#47': '/',
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'quot': '"'
}

function decodeHTMLEntities(text) {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
        return entities[entity] || match
    })
}

function render(content: string) {
    let html = md.render(content);
    // handle iframe
    let matches = html.match(/<p>{% iframe .*%}<\/p>/g);
    if (matches) {
        matches.forEach(match => {
            // get url and options
            const [, , url, ...option] = match.split(' ');
            // remove ending liquid tag
            option.pop();

            // make options object
            const options = {} 
            option.forEach(o => {
                const [key, value] = o.split('=') // split option on equals to
                options[key] = value;
            })
            let additional = "";
            if('height' in options) {
                additional += `height="${options.height}" `
            }

            // replace liquid tag with iframe
            html = html.replace(match, `<iframe
            ${additional}
             src="${url}"></iframe>`);
        });
    }
    
    // handle html
    matches = html.match(/<p>{% html .*%}<\/p>/g);
    if (matches) {
        matches.forEach(match => {
            // get url and options
            let [, , ...additional] = match.split(' ');
            // remove ending liquid tag
            additional.pop();
            additional = decodeHTMLEntities(additional.join(' '));
            // replace liquid tag with script
            html = html.replace(match, additional);
        })
    }


    return html;
}

export function Remarkable({ blog }) {
    useEffect(() => {

        window.Prism.highlightAll();
    }, [blog.content]);

    return (
        <div className="Remarkable">
            <h1 className="title py-2 px-4 mb-3">{blog.title || 'Untitled'}</h1>
            <div className="py-2 px-4" dangerouslySetInnerHTML={{ __html: render(blog.content) }}></div>
        </div>
    )
}