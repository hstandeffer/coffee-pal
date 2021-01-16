import React from 'react'
import { Typography, Box, Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = () => (
    <Box style={{ minHeight: 'calc(100vh - 65px)' }} display="flex" justifyContent="center" alignItems="center">
      <Container maxWidth="xs">
        <Box textAlign="center">
          <Box my={2}>
            <Typography gutterBottom component="h1" variant="h3">
              Page Not Found
            </Typography>
            <Typography paragraph variant="body1">
              Sorry, we could not find what you were looking for.
            </Typography>
          </Box>
          <Link to={'/'}>
            <Button color="primary" variant="outlined">Return Home</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  
)

export default NotFound 