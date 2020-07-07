import React from 'react';
import { StyledButton } from './style';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <StyledButton type="button" onClick={firebase.doSignOut}>Sign Out</StyledButton>
);

export default withFirebase(SignOutButton);