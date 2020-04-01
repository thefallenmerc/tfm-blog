import React from 'react';

export const SessionContext = React.createContext(null);

export const withSessionProvider = Component => {
    class WithSession extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user: null
            }
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
                this.setState({
                    user
                });
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <SessionContext.Provider value={this.state.user}>
                    <Component {...this.props} />
                </SessionContext.Provider>
            )
        }
    }

    return WithSession;
}

export const withSession = Component => props => {
    return (
        <SessionContext.Consumer>
            {user => <Component user={user} {...props} />}
        </SessionContext.Consumer>
    )
}