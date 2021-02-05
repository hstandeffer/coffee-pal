import React from 'react'
import { PasswordChangeForm } from '../PasswordChange'
import { Box } from '@material-ui/core'
import Seo from '../../shared/components/Seo'

const AccountPage = () => (
  <Box maxWidth="480px" px="2.5rem" mb="2.5rem" mx="auto" textAlign="center" borderRadius="4px">
    <Seo title={'Account Settings'} />
    <Box mt="1rem">
      <PasswordChangeForm />
    </Box>
  </Box>
)

export default AccountPage