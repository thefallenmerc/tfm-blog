import React from 'react';
import { withFirebase, withSession, withToast } from '../_contexts';
import { useState } from 'react';
import { Sidebar, Remarkable } from '../_components';
import { useEffect } from 'react';
import { history } from '../_config';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-xcode";
import { beautify } from "ace-builds/src-noconflict/ext-beautify";

export const DASHBOARD_ROUTE = '/dashboard';
export const DASHBOARD_EDIT_ROUTE = '/dashboard/edit/:url';

function DashboardPageComponent({ firebase, user, match, addToast, toggleSidebar }) {

    // initialize all the variable
    const [title, setTitle] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [content, setContent] = useState('');

    const [showPreview, setShowPreview] = useState(true);

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
                setIsPublished(e.isPublished);
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

        const url = makeUrl(title);

        (
            editable ?
                firebase.db.collection('users').doc(user.uid).collection('blogs').doc(editable.id).set({
                    title,
                    url,
                    isPublished,
                    content
                }) :
                firebase.db.collection('users').doc(user.uid).collection('blogs').add({
                    title,
                    url,
                    isPublished,
                    content
                })
        ).then(response => {
            if (!editable) {
                setTitle('');
                setContent('');
                setIsPublished(false);
            }
            addToast('Blog saved');
            // if title has changed then redirect to new title
            if (match.params.url !== url) {
                history.push('/dashboard/edit/' + url);
            }
        }).catch(e => {
            addToast(e.message);
        });

    };

    const makeUrl = title => (title.toLowerCase().replace(/[\s_]/g, '-').replace(/[|[\]]/g, '').replace(/(-){2,}/g, '-'));

    return (
        <div className="DashboardPage">
            <Sidebar blogs={blogs} to={url => '/dashboard/edit/' + url} activeUrl={match.params.url} toggleSidebar={toggleSidebar} />
            <form onSubmit={addBlog} className="main-content">
                <input
                    name="title" type="text" placeholder="Title"
                    className="w-full pr-24 p-2 mb-3 font-bold text-2xl focus:outline-none" value={title}
                    onChange={e => setTitle(e.target.value)} />
                <div className="text-right pb-2">
                    <label className="text-right px-4 inline-block cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showPreview}
                            onChange={e => setShowPreview(e.target.checked)} /> Show Preview?
                    </label>
                    <label className="text-right px-4 inline-block cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={e => setIsPublished(e.target.checked)} /> Published?
                    </label>
                </div>
                <AceEditor
                    mode="markdown"
                    className="w-full p-2 focus:outline-none ace-dillinger "
                    theme="xcode"
                    onChange={setContent}
                    name="aceeditor"
                    value={content}
                    height="calc(100vh - 172px)"
                    wrapEnabled
                    editorProps={{ $blockScrolling: true }}
                    style={{ width: '100%', lineHeight: '1.5rem', fontSize: '1rem' }}
                    commands={[{
                        name: 'beautify',
                        exec: editor => {
                            beautify(editor.session);
                        },
                        bindKey: 'Shift-Alt-F'
                    }]}
                />
                <button type="submit" className="px-4 py-2 rounded theme-bg-text mx-auto block focus:outline-none">Save</button>
            </form>
            <div className={"remarkable " + (showPreview ? "block" : "hidden")}>
                <Remarkable blog={{ title, content }} />
            </div>
        </div>
    )
}

export const DashboardPage = withToast(withFirebase(withSession(DashboardPageComponent)));