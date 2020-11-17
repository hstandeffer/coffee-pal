import React, { useState, useEffect } from 'react'
import { Box, Typography, FormLabel } from '@material-ui/core'
import { Input, StyledButton } from '../../shared-style'

import axios from 'axios'

import withAuthorization from '../Session/withAuthorization'
import roasterService from '../../services/roaster'
import userService from '../../services/user'

const AddRoaster = () => {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [website, setWebsite] = useState('')
  const [image, setImage] = useState()

  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    userService.getCurrentUser().then(response => {
      setUserId(response.data)
    })
    setLoading(false)
  }, [])

  const handleUpload = async event => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData()
    data.append('roasterImage', image)
    data.append('name', name)
    data.append('city', city)
    data.append('state', state)
    data.append('country', country)
    data.append('website', website)

    axios.post('/api/roasters', data)
    // roasterService.add(data)
  }

  if (loading) return <p>Loading...</p>

  return (
    <Box maxWidth="600px" p="2.5rem" my="2.5rem" mx="auto" textAlign="center" border="1px solid #d9e7ea" borderRadius="4px">
    <Typography variant="h4" component="h2" style={{padding: '0 10px 40px', margin: 0}}>Add Roaster</Typography>
      <Box textAlign="left">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormLabel required htmlFor="name">Roaster Name</FormLabel>
          <Input id="name" required value={name} onChange={({ target }) => setName(target.value)} />

          <FormLabel required htmlFor="city">City</FormLabel>
          <Input id="city" required value={city} onChange={({ target }) => setCity(target.value)} />

          <FormLabel required htmlFor="state">State</FormLabel>
          <Input id="state" required value={state} onChange={({ target }) => setState(target.value)} />

          <FormLabel required htmlFor="country">Country</FormLabel>
          <Input id="country" required value={country} onChange={({ target }) => setCountry(target.value)} />

          <FormLabel htmlFor="website">Website</FormLabel>
          <Input id="website" value={website} onChange={({ target }) => setWebsite(target.value)} />

          <FormLabel htmlFor="roasterImage">Image URL</FormLabel>
          <Input type="file" name="roasterImage" id="roasterImage" onChange={handleUpload} />

          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </Box>
    </Box>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(AddRoaster)