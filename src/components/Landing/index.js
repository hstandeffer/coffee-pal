import React from 'react';
import { Wrapper, StyledDiv, StyledButton, StyledH1 } from './style';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <Wrapper>
    <StyledDiv>
      <StyledH1>Discover High Quality Coffee</StyledH1>
      <h4>Coffee Pal gathers hundreds of unique, top-quality coffees so you can easily discover coffee you'll enjoy.</h4>
      <Link to={ROUTES.SIGN_UP}><StyledButton>Get Started</StyledButton></Link>
    </StyledDiv>
  </Wrapper>
);

export default Landing;