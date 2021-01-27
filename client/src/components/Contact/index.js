import React, { useState } from 'react'
import { Grid, Box, Container, Typography, makeStyles, Button, TextField } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import contactService from '../../services/contact'
import Toast from '../../shared/components/Toast'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    }
  },
  halfLg: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values['lg'] / 2
    }
  },
  firstBox: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: 'auto',
      paddingRight: theme.spacing(6)
    }
  },
  secondBox: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(6)
    }
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}))

const Contact = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await contactService.send(email, message).catch((err) => {
      if (err.errors) {
        setError(`${err.errors[0].msg} for ${err.errors[0].param} field.`)
      }
      else {
        setError(err.error)
      }
    })

    if (!response) {
      return
    }

    setEmail('')
    setMessage('')
    setOpen(true)
  }

  return (
    <Box py={6} className={classes.root}>
      <Box pb={4} textAlign="center">
        <Typography variant="h4">Contact Us</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box py={10} borderRadius="1rem" display="flex" bgcolor="action.selected">
            <Box className={`${classes.halfLg} ${classes.firstBox}`}>
              <Container>
                <Typography variant="h5" component="h2" gutterBottom={true}>Questions or concerns?</Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph={true}>Fill out the contact form or email the address below with any suggestions or questions, and we'll get back to you shortly.</Typography>
                <Box mt={4}>
                  <Box display="flex">
                    <EmailIcon className={classes.icon} />
                    <Typography variant="body1" color="textSecondary" paragraph={true}>baroastacoffee@gmail.com</Typography>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box py={10} display="flex" className={`${classes.halfLg} ${classes.secondBox}`}>
            <Container>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" value={email} onChange={({ target }) => setEmail(target.value)} required fullWidth name="email" id="email" label="Email address" autoComplete="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" value={message} onChange={({ target }) => setMessage(target.value)} required multiline rows={5} fullWidth autoComplete="message" name="message" id="message" label="Message" />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </form>
            </Container>
          </Box> 
        </Grid>
      </Grid>
      { error &&
        <Box my="1rem">
          <Alert severity="error">{error}</Alert>
        </Box>
      }
      <Toast open={open} setOpen={setOpen} severity="success" message="Your message has been sent!" />
    </Box>
  )
}

export default Contact