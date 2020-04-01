import React from 'react';

export const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {
            firebase => <Component firebase={firebase} {...props} />
        }
    </FirebaseContext.Consumer>
)