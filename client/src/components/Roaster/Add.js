import React, { useState, useEffect } from 'react'
import { Box, Typography, FormLabel } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { PlacesAutocomplete } from '../../shared/hooks/PlacesAutocomplete'
import { getStoredAuthToken } from '../../shared/utils/authToken'

import { StyledButton, Textarea } from '../../shared-style'
import { Input } from './style'

import axios from 'axios'
import userService from '../../services/user'

const AddRoaster = () => {
  const config = {
    headers: { Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined },
  }

  const ref = React.useRef()

  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [image, setImage] = useState()

  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    userService.getCurrentUser().then(response => {
      setUserId(response)
    })
    setLoading(false)
  }, [])

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleUpload = async event => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData()
    data.append('roasterImage', image)
    data.append('name', name)
    data.append('summary', summary)
    data.append('address', address)
    data.append('website', website)
    data.append('addedBy', userId)

    await axios.post('/api/roasters', data, config)
    setOpen(true)
    setName('')
    setSummary('')
    setAddress('')
    setWebsite('')
    ref.current.value = ''
  }

  if (loading) return <p>Loading...</p>

  return (
    <Box bgcolor="#fff" maxWidth="600px" p="2.5rem" my="2.5rem" border="1px solid #d9e7ea" borderRadius="4px" mx="auto" textAlign="center">
    <Typography gutterBottom paragraph variant="h4" component="h2">Add New Roaster</Typography>
      <Box textAlign="left">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormLabel required htmlFor="name">Roaster Name</FormLabel>
          <Input id="name" required value={name} onChange={({ target }) => setName(target.value)} />

          <FormLabel required htmlFor="summary">Roaster Summary</FormLabel>
          <Textarea style={{ margin: '5px auto 15px', fontSize: 'inherit'}} placeholder="Started in Austin in 2001..." id="summary" required value={summary} onChange={({ target }) => setSummary(target.value)} />

          <FormLabel htmlFor="website">Website URL</FormLabel>
          <Input id="website" value={website} onChange={({ target }) => setWebsite(target.value)} />

          <FormLabel htmlFor="address">Address</FormLabel>
          <PlacesAutocomplete address={address} setAddress={setAddress} />

          <FormLabel color="primary" htmlFor="roasterImage">Logo Image</FormLabel>
          <Input type="file" ref={ref} name="roasterImage" id="roasterImage" onChange={handleUpload} />

          <StyledButton type="submit">Submit</StyledButton>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Roaster has been successfully added!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default AddRoaster