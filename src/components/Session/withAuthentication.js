import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authUser: null,
        loaded: false
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => { // this is the "next" callback function passed to the firebase class, passing in authUser when state changes
          this.setState({ authUser })
          this.setState({ loaded: true})
        },
        () => { // this is the "fallback" callback function passed to the firebase class, setting authUser to null when state changes
          this.setState({ authUser: null })
          this.setState({ loaded: true})
        }
      )
    }
  
    componentWillUnmount() {
      this.listener();
    }

    render() {
      if (!this.state.loaded) {
        return null
      }
      
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