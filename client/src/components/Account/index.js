import React from 'react';
import { Wrapper } from '../../shared-style';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Wrapper>
        <Box maxWidth="480px" py="1rem" px="2.5rem" mb="2.5rem" mx="auto" textAlign="center" border="1px solid #d9e7ea" borderRadius="4px">
          <Typography variant="h4" component="h2">Account Settings</Typography>
          <Box mt="2rem" mb='2rem'>
            <PasswordForgetForm />
          </Box>
          <Box mt="1rem">
            <PasswordChangeForm />
          </Box>
        </Box>
      </Wrapper>
    )}
  </AuthUserContext.Consumer>  
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage)