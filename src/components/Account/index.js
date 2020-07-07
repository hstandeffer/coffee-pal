import React from 'react';
import { StyledDiv } from './style'

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <StyledDiv>
        <h1>Account Settings: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </StyledDiv>
    )}
  </AuthUserContext.Consumer>  
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage)