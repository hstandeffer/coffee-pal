import React from 'react';
import { Wrapper } from '../../shared-style';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from '../Session';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const AccountPage = () => (
  <Wrapper>
    <Box maxWidth="480px" py="1rem" px="2.5rem" mb="2.5rem" mx="auto" textAlign="center" border="1px solid #d9e7ea" borderRadius="4px">
      <Typography variant="h4" component="h2">Account Settings</Typography>
      <Box mt="1rem">
        <PasswordChangeForm />
      </Box>
    </Box>
  </Wrapper>
)

// const condition = authUser => !!authUser
const condition = () => 'all'

export default withAuthorization(condition)(AccountPage)