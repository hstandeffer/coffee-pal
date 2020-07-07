import React from 'react';
import { StyledDiv, StyledButton } from './style';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <StyledDiv>
    <h1>Clean Beans</h1>
    <Link to={ROUTES.SEARCH}><StyledButton>Discover Coffees</StyledButton></Link>
  </StyledDiv>
);

export default Landing;