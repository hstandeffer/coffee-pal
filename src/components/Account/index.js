import React from 'react';
import { Wrapper, StyledDiv } from '../../shared-style';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Wrapper>
        <StyledDiv>
          <h1>Account Settings: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </StyledDiv>
      </Wrapper>
    )}
  </AuthUserContext.Consumer>  
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage)