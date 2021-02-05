import React, { useState } from 'react'
import { Box, Typography, FormLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { PlacesAutocomplete } from '../../shared/hooks/PlacesAutocomplete'

import { StyledButton, Textarea } from '../../shared-style'
import { Input } from './style'

import roasterService from '../../services/roaster'
import Seo from '../../shared/components/Seo'
import Toast from '../../shared/components/Toast'

const AddRoaster = () => {
  const ref = React.useRef()

  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [image, setImage] = useState()
  
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleUpload = async event => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const roasterObj = {
      name,
      summary,
      address,
      website,
      image,
    }

    const response = await roasterService.add(roasterObj).catch((err) => {
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

    setOpen(true)
    setName('')
    setSummary('')
    setAddress('')
    setWebsite('')
    ref.current.value = ''
  }

  return (
    <Box bgcolor="#fff" maxWidth="600px" p="2.5rem" my="2.5rem" border="1px solid #d9e7ea" borderRadius="4px" mx="auto" textAlign="center">
      <Seo title={'Add New Roaster'} />
      <Typography gutterBottom paragraph variant="h4" component="h2">Add New Roaster</Typography>
      <Box textAlign="left">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormLabel required htmlFor="name">Roaster Name</FormLabel>
          <Input id="name" name="name" value={name} onChange={({ target }) => setName(target.value)} />

          <FormLabel htmlFor="summary">Roaster Summary</FormLabel>
          <Textarea style={{ margin: '5px auto 15px', fontSize: 'inherit'}} id="summary" name="summary" value={summary} onChange={({ target }) => setSummary(target.value)} />

          <FormLabel required htmlFor="website">Website URL</FormLabel>
          <Input id="website" name="website" value={website} onChange={({ target }) => setWebsite(target.value)} />

          <FormLabel htmlFor="address">Address</FormLabel>
          <PlacesAutocomplete address={address} setAddress={setAddress} />

          <FormLabel required color="primary" htmlFor="roasterImage">Logo Image</FormLabel>
          <Input type="file" ref={ref} name="roasterImage" id="roasterImage" onChange={handleUpload} />

          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }

          <StyledButton type="submit">Submit</StyledButton>
        </form>
        <Toast open={open} setOpen={setOpen} severity="success" message="Roaster has been successfully added" />
      </Box>
    </Box>
  )
}

export default AddRoaster