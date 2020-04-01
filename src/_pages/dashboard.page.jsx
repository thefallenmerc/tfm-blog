import React from 'react';
import { withFirebase, withSession, withToast } from '../_contexts';
import { useState } from 'react';
import { Sidebar, Remarkable } from '../_components';
import { useEffect } from 'react';
import { history } from '../_config';

export const DASHBOARD_ROUTE = '/dashboard';
export const DASHBOARD_EDIT_ROUTE = '/dashboard/edit/:url';

function DashboardPageComponent({ firebase, user, match, addToast, toggleSidebar }) {

    // initialize all the variable
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [blogs, setBlogs] = useState([]);

    const [editable, setEditable] = useState(null);

    // fetch users blogs 
    useEffect(() => {
        const l1 = firebase.db.collection('users').doc(user.uid).collection('blogs').onSnapshot(snapshot => {
            const b = [];
            snapshot.forEach(e => {
                const blog = { ...e.data(), id: e.id };
                b.push(blog);

            });
            setBlogs(b);
        })

        return () => {
            l1();
        }
    }, []);

    useEffect(() => {


        // set blog to edit if needed
        if ('url' in match.params) {
            const { url } = match.params;
            const e = blogs.find(blog => blog.url === url);
            if (e) {
                setTitle(e.title);
                setContent(e.content);
                setEditable(e);
            }
        }
    }, [match.params, blogs]);

    // function to store blog to firebase
    const addBlog = event => {
        event.preventDefault();

        if (!title.trim()) {
            return addToast('Title cannot be empty!');
        }
        if (!content.trim()) {
            return addToast('Content cannot be empty!');
        }

        (
            editable ?
                firebase.db.collection('users').doc(user.uid).collection('blogs').doc(editable.id).set({
                    title,
                    url: title.toLowerCase().replace(/\s/g, '-'),
                    content
                }) :
                firebase.db.collection('users').doc(user.uid).collection('blogs').add({
                    title,
                    url: title.toLowerCase().replace(/\s/g, '-'),
                    content
                })
        ).then(response => {
            if(!editable) {
                setTitle('');
                setContent('');
            }
            addToast('Blog saved');
            // if title has changed then redirect to new title
            const url = title.toLowerCase().replace(/\s/g, '-');
            if (match.params.url !== url) {
                history.push('/dashboard/edit/' + url);
            }
        }).catch(e => {
            addToast(e.message);
        });

    };

    return (
        <div className="DashboardPage">
            <Sidebar blogs={blogs} to={url => '/dashboard/edit/' + url} activeUrl={match.params.url} toggleSidebar={toggleSidebar} />
            <form onSubmit={addBlog} className="main-content">
                <input
                    name="title" type="text" placeholder="Title"
                    className="w-full p-2 mb-3 text-2xl focus:outline-none" value={title}
                    onChange={e => setTitle(e.target.value)} />
                <textarea className="w-full p-2 focus:outline-none"
                    placeholder="Content" name="content" value={content}
                    onChange={e => { setContent(e.target.value) }}></textarea>
                <button type="submit" className="px-4 py-2 bg-orange-500 rounded text-white mx-auto block focus:outline-none">Save</button>
            </form>
            <div className="remarkable">
                <Remarkable blog={{ title, content }} />
            </div>
        </div>
    )
}

export const DashboardPage = withToast(withFirebase(withSession(DashboardPageComponent)));