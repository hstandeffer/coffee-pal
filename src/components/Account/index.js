import React from 'react';
import { Wrapper, StyledDiv } from '../../shared-style';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Wrapper>
        <StyledDiv>
          <Typography variant="h4" component="h2">Account Settings</Typography>
          <Typography variant="h5" component="p">{authUser.email}</Typography>
          <Box mt="1rem" mb='3rem'>
            <PasswordForgetForm />
          </Box>
          <Box mt="1rem" mb='3rem'>
            <PasswordChangeForm />
          </Box>
        </StyledDiv>
      </Wrapper>
    )}
  </AuthUserContext.Consumer>  
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage)