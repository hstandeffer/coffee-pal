import React from 'react'
import { Container, Box, Typography, Link, makeStyles } from '@material-ui/core'
import * as ROUTES from '../../constants/routes'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    }
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    }
  },
  copy: {
    textAlign: 'center'
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <footer>
      <Container maxWidth="lg">
        <Box py={6}  display="flex" flexWrap="wrap" alignItems="center" className={classes.rootBox}>
          <Link component={RouterLink} to={ROUTES.LANDING} variant="h5" color="inherit" underline="none">
            baroasta
          </Link>
          <Box component="nav" className={classes.footerNav}>
            <Link component={RouterLink} to={ROUTES.CONTACT} variant="body1" color="textSecondary" className={classes.footerLink}>Contact Us</Link>
          </Box>
          <Typography color="textSecondary" component="p" variant="body2" gutterBottom={false} className={classes.copy}>2021 Baroasta. All rights reserved.</Typography>
        </Box>
      </Container>
    </footer>
  )
}

export default Footer