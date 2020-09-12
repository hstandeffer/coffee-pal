import React, { Component } from 'react';
import { Input, StyledButton } from '../../shared-style';

import { withFirebase } from '../Firebase';
import { Box } from '@material-ui/core';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      })

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo || passwordOne === '';
    
    return (
      <Box p="1rem" border={1} borderColor='#ededed'>
        <h3>Change Password</h3>
        <form onSubmit={this.onSubmit}>
          <Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
          <Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
          <StyledButton disabled={isInvalid} type="submit">
            Change Password
          </StyledButton>
          {error && <p>{error.message}</p>}
        </form>
      </Box>
    )
  }
}

export default withFirebase(PasswordChangeForm);