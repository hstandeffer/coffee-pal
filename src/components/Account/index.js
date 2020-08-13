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
          <h2>Account Settings</h2>
          <p style={{fontSize: '20px', color: '#383838'}}>{authUser.email}</p>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </StyledDiv>
      </Wrapper>
    )}
  </AuthUserContext.Consumer>  
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage)