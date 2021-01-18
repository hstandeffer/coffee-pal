import React from 'react'
import { Container, Grid, Box, Typography, Link } from '@material-ui/core'
import * as ROUTES from '../../constants/routes'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => (
  <Box bgcolor="#275e71" pt="3rem">
    <Container maxWidth="md">
      <Box py="3rem">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box mb="3rem" fontSize="1.5rem" fontWeight="600" color="#fff">baroasta</Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb="3rem" color="#fff">
              <Typography gutterBottom component="h2" variant="h5">Quick Links</Typography>
              <Typography component="p">
                <Link component={RouterLink} style={{ color: 'rgb(243 242 242)' }} underline="hover" to={ROUTES.CONTACT}>Contact Us</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </Box>
)

export default Footer