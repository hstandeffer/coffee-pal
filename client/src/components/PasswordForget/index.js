import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const PasswordForgetPage = () => (
  <StyledDiv>
    <h1>Forgot your password?</h1>
    <PasswordForgetForm />
  </StyledDiv>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <Box p="1rem" border={1} borderColor='#ededed'>
        <Typography variant="h6" component="p">Reset Password</Typography>
        <form onSubmit={this.onSubmit}>
          <Input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <StyledButton disabled={isInvalid} type="submit">
            Reset Password
          </StyledButton>
          {error && <p>{error.message}</p>}
        </form>
      </Box>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <StyledLink to={ROUTES.PASSWORD_FORGET}>Forgot Password?</StyledLink>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };