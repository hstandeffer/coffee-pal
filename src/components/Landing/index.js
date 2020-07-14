import React from 'react';
import { StyledH1 } from '../../shared-style';
import { LandingBanner, GetStartedButton, FullWidthDiv, FullWidthWrapper } from './style'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <FullWidthWrapper>
    <LandingBanner>
      <StyledH1>Discover High Quality Coffee</StyledH1>
      <h4>Coffee Pal gathers hundreds of unique, top-quality coffees so you can easily discover coffee you'll enjoy.</h4>
      <Link to={ROUTES.SIGN_UP}><GetStartedButton>Get Started</GetStartedButton></Link>
    </LandingBanner>
    <FullWidthDiv bgColor='#fff'>
      
    </FullWidthDiv>
  </FullWidthWrapper>
);

export default Landing;