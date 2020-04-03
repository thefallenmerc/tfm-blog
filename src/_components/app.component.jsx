import React, { useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, LOGIN_ROUTE, HOMEPAGE_ROUTE, DASHBOARD_ROUTE, DashboardPage, DASHBOARD_EDIT_ROUTE, POSTPAGE_ROUTE, PostPage } from '../_pages';
import { history } from '../_config';
import { withFirebase, withSessionProvider, withSession, ToastContext, ToastNotifier } from '../_contexts';
import { ProtectedRoute } from './protected-route.component';
import { Navbar } from './navbar.component';
import { Footer } from './footer.component';
import { Loader } from './loader.component';

console.log(process.env.REACT_APP_LOL);

function AppComponent({ firebase, user }) {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [toasts, setToasts] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [blogsLoaded, setBlogsLoaded] = useState(false);
    let listeners = [];

    useEffect(() => {
        // get all the blogs and set them in blogs variable
        const userId = process.env.REACT_APP_DEFAULT_USER_ID;
        const listener = firebase.db.collection('users').doc(userId).collection('blogs')
            .onSnapshot(snapshots => {
                const b = [];
                snapshots.forEach(e => {
                    b.push(e.data());
                })
                setBlogs(b);
                setBlogsLoaded(true);
            });

        // listen for user state change
        const l2 = firebase.auth.onAuthStateChanged(user => {
            setIsAuthChecked(true);
        });

        // destroy the blogs listener on cleanup
        return () => {
            listener();
            l2();
            listeners.forEach(l => {
                clearTimeout(l);
            })
        }
    }, [user]);

    const addToast = (title = '', message = '', type = '') => {
        const toast = { title, message, type, timestamp: (new Date()).getTime() };
        setToasts([...toasts, toast]);
        listeners.push(setTimeout(() => {
            removeToast(toast);
        }, 3000));
    }

    const removeToast = toast => {
        const newToast = [...toasts];
        newToast.splice(newToast.find(t => t.timestamp === toast.timestamp), 1);
        setToasts(newToast);
    }

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    }

    return (
        <div className={"App" + (isSidebarVisible ? " with-sidebar" : "")}>
            {
                blogsLoaded ?
                    <ToastContext.Provider value={{
                        toasts,
                        addToast,
                        removeToast
                    }}>
                        <Router history={history}>
                            <Navbar toggleSidebar={toggleSidebar} />
                            <Switch>
                                <Route
                                    path={LOGIN_ROUTE} exact
                                    component={LoginPage} />
                                <Route
                                    path={HOMEPAGE_ROUTE} exact
                                    render={props => <HomePage blogs={blogs} {...props} toggleSidebar={toggleSidebar} />} />
                                <ProtectedRoute
                                    path={DASHBOARD_ROUTE} exact
                                    isAuthChecked={isAuthChecked}
                                    render={props => <DashboardPage {...props} blogs={blogs} isAuthChecked={isAuthChecked} toggleSidebar={toggleSidebar} />} />
                                <ProtectedRoute
                                    path={DASHBOARD_EDIT_ROUTE} exact
                                    isAuthChecked={isAuthChecked}
                                    render={props => <DashboardPage {...props} blogs={blogs} isAuthChecked={isAuthChecked} toggleSidebar={toggleSidebar} />} />
                                <Route
                                    path={POSTPAGE_ROUTE}
                                    render={props => <PostPage blogs={blogs} {...props} toggleSidebar={toggleSidebar} />} />
                            </Switch>
                            <Footer />
                        </Router>
                        <ToastNotifier />
                    </ToastContext.Provider> :
                    <Loader />
            }
        </div>
    );
}

const App = withFirebase(withSessionProvider(withSession(AppComponent)));

export { App };
