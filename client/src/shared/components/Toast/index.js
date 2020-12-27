import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Toast = ({ severity, message, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity || 'success'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Toast