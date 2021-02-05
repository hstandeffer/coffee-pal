import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const AlertDialog = ({ open, setOpen, title, description }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link component={RouterLink} to={ROUTES.SIGN_IN} variant="h5" color="inherit" underline="none">
          <Button color="primary">
            Sign In  
          </Button>
        </Link>
        <Link component={RouterLink} to={ROUTES.SIGN_UP} variant="h5" color="inherit" underline="none">
          <Button color="primary">
            Sign Up
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog