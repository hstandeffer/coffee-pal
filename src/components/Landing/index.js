import React from 'react';
import { LandingBanner, GetStartedButton, FullWidthWrapper, FeaturesWrapper, FeaturesHeader } from './style'
import { Input } from '../../shared-style'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Landing = () => (
  <FullWidthWrapper>
    <LandingBanner>
      <Typography variant="h3" component="h1">Discover Better Coffee</Typography>
      <p>Browse from and compare hundreds of coffees from around the world</p>
      <Link to={ROUTES.SIGN_UP}><GetStartedButton>Get Started</GetStartedButton></Link>
    </LandingBanner>
    <FeaturesWrapper>
      <FeaturesHeader>Import coffee information from a product URL</FeaturesHeader>
      <Input placeholder="Enter a product URL"></Input>
    </FeaturesWrapper>
    <FeaturesWrapper>
      <Grid container direction="row">
        <Grid container item justify="center" xs={12} sm={4}>
          <p>Item 1</p>
        </Grid>
        <Grid container item justify="center" xs={12} sm={4}>
          <p>Item 2</p>
        </Grid>
        <Grid container item justify="center" xs={12} sm={4}>
          <p>Item 3</p>
        </Grid>
      </Grid>
    </FeaturesWrapper>
  </FullWidthWrapper>
);

export default Landing;