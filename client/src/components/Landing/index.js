import React, { useState, useEffect } from 'react'
import { withAuthorization } from '../Session'
import { LandingBanner, StyledButton } from './style'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'

import coffeeService from '../../services/coffee'

import Typography from '@material-ui/core/Typography'
import { Grid, Box } from '@material-ui/core';
import { CoffeeItem } from '../Product/ProductGrid';

const Landing = () => {
  const [coffees, setCoffees] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getCoffees = async () => {
      const recentCoffees = await coffeeService.getRecentCoffees()
      setCoffees(recentCoffees)
    }
    getCoffees()
    setLoading(false)
  }, [])

  return (
    <Box width="100%">
      <LandingBanner>
        <Typography paragraph={true} variant="h3" component="h1">Discover Better Coffee</Typography>
        <Typography color="inherit" paragraph={true} variant="h6">Browse from and compare hundreds of coffees from around the world</Typography>
        <Box my={1}>
          <Link to={ROUTES.SIGN_UP}><StyledButton>Get Started</StyledButton></Link>
        </Box>
      </LandingBanner>
      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} lg={10}>
          <Box my={10} mx={4} textAlign="center">
            <Box my={2}>
              <Typography variant="h4">Recently Added Coffees</Typography>
            </Box>
            <Grid container justify="center" alignItems="center">
              {coffees && !loading ? coffees.map((coffee) => (
                <CoffeeItem key={coffee.id} coffee={coffee} route={'coffee'}/>
              )) : <Typography variant="h6">Loading...</Typography> }
            </Grid>
            <Box my={1}>
              <Link to={ROUTES.SEARCH}><StyledButton>View All</StyledButton></Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const condition = () => 'public'

export default withAuthorization(condition)(Landing)