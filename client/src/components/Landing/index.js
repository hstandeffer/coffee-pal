import React, { useState, useEffect } from 'react'
import { LandingBanner, StyledButton } from './style'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'

import coffeeService from '../../services/coffee'
import roasterService from '../../services/roaster'

import Typography from '@material-ui/core/Typography'
import { Grid, Box, Container } from '@material-ui/core';
import { CoffeeItem, RoasterItem } from '../Product/ProductGrid';
import FullPageSpinner from '../../shared/components/Spinner';

const Landing = () => {
  const [coffees, setCoffees] = useState()
  const [roasters, setRoasters] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getCoffees = async () => {
      const recentCoffees = await coffeeService.getRecent()
      setCoffees(recentCoffees)
    }

    const getRoasters = async () => {
      const recentRoasters = await roasterService.getRecent()
      setRoasters(recentRoasters)
    }

    getCoffees()
    getRoasters()
    setLoading(false)
  }, [])

  return (
    <Box width="100%">
      <LandingBanner>
        <Container>
          <Typography style={{ fontWeight: `500` }} paragraph={true} variant="h3" component="h1">Find the Perfect Coffee</Typography>
          <Typography style={{ fontWeight: `400` }} color="inherit" paragraph={true} variant="h6">Browse from and compare hundreds of coffees and roasters from around the world</Typography>
          <Box my={1}>
            <Link to={ROUTES.SIGN_UP}><StyledButton>Get Started</StyledButton></Link>
          </Box>
        </Container>
      </LandingBanner>
      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} lg={10}>
          <Box my={10} mx={4} textAlign="center">
            <Box my={2}>
              <Typography variant="h4">Recently Added Coffees</Typography>
            </Box>
            <Grid container alignItems="center">
              {coffees && !loading ? coffees.map((coffee) => (
                <CoffeeItem key={coffee.id} coffee={coffee} route={'coffees'}/>
              )) : <FullPageSpinner size={50} /> }
            </Grid>
            <Box my={1}>
              <Link to={ROUTES.BROWSE}><StyledButton>View All</StyledButton></Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} lg={10}>
          <Box my={10} mx={4} textAlign="center">
            <Box my={2}>
              <Typography variant="h4">Recently Added Roasters</Typography>
            </Box>
            <Grid container alignItems="center">
              {roasters && !loading ? roasters.map((roaster) => (
                <RoasterItem key={roaster.id} roaster={roaster} route={'roaster'} />
              )) : <FullPageSpinner size={50} /> }
            </Grid>
            <Box my={1}>
              <Link to={ROUTES.ROASTERS}><StyledButton>View All</StyledButton></Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Landing