import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => { // this is the "next" callback function passed to the firebase class, passing in authUser when state changes
          this.setState({ authUser })
        },
        () => { // this is the "fallback" callback function passed to the firebase class, setting authUser to null when state changes
          this.setState({ authUser: null })
        }
      )
    }
  
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(withAuthentication);
}

export default withAuthentication;