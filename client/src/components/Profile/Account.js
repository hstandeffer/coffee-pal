import React from 'react'
import { PasswordChangeForm } from '../PasswordChange'
import { Box } from '@material-ui/core'

const AccountPage = () => (
  <Box maxWidth="480px" px="2.5rem" mb="2.5rem" mx="auto" textAlign="center" borderRadius="4px">
    <Box mt="1rem">
      <PasswordChangeForm />
    </Box>
  </Box>
)

export default AccountPage