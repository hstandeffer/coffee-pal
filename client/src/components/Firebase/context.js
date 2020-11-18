import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
); //review how this works

export default FirebaseContext;

// function written out here to show how components are passed, 
// const withFirebase = function(Component) {
//     return function(props) {
//         <FirebaseContext.Consumer>
//              return function(firebase) {
//                <Component {...props} firebase={firebase} />
//              }
//         </FirebaseContext.Consumer>
//     }
// }