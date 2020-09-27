import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { BoldLabel } from './style'
import { Input, StyledButton } from '../../shared-style'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withFirebase } from '../Firebase'

const Add = ({ firebase }) => {
  const [title, setTitle] = useState('')
  const [siteName, setSiteName] = useState('')
  const [countries, setCountries] = useState('')
  const [fairTrade, setFairTrade] = useState(false)
  const [organic, setOrganic] = useState(false)
  const [shadeGrown, setShadeGrown] = useState(false)
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [roastType, setRoastType] = useState('light')

  const handleSubmit = () => {
    const addedBy = firebase.auth.currentUser.uid
    const verified = false
    const coffeeObj = {
      title,
      siteName,
      countries,
      fairTrade,
      organic,
      shadeGrown,
      url,
      imageUrl,
      price,
      roastType,
      addedBy,
      verified
    }

    firebase.coffees().push().set(coffeeObj)
  }

  return (
    <Box maxWidth="600px" p="2.5rem" my="2.5rem" mx="auto" textAlign="center" border="1px solid #d9e7ea" borderRadius="4px">
    <Typography variant="h4" component="h2" style={{padding: '0 10px 40px', margin: 0}}>Add Coffee</Typography>
      <Box textAlign="left">
        <form onSubmit={handleSubmit()}>
          <BoldLabel htmlFor="title">Coffee Name</BoldLabel>
          <Input id="title" required value={title} onChange={({ target }) => setTitle(target.value)} />

          <BoldLabel htmlFor="siteName">Brand</BoldLabel>
          <Input id="siteName" required value={siteName} onChange={({ target }) => setSiteName(target.value)} />

          <BoldLabel htmlFor="price">Price ($)</BoldLabel>
          <Input id="price" required value={price} onChange={({ target }) => setPrice(target.value)} />

          <BoldLabel htmlFor="roastType">Roast Type</BoldLabel>
          <Box my="1rem">
            <Select
              id="roastType"
              value={roastType}
              onChange={({ target }) => setRoastType(target.value)}
              autoWidth
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </Box>

          <BoldLabel htmlFor="countries">Countries</BoldLabel>
          <Input id="countries" required value={countries} onChange={({ target }) => setCountries(target.value)} />

          <BoldLabel htmlFor="url">Product URL</BoldLabel>
          <Input id="url" value={url} onChange={({ target }) => setUrl(target.value)} />

          <BoldLabel htmlFor="imageUrl">Image URL</BoldLabel>
          <Input id="imageUrl" value={imageUrl} onChange={({ target }) => setImageUrl(target.value)} />

          <Box display="flex" flexDirection="row" justifyContent="space-around">
            <FormControlLabel
              control={<Checkbox id="fairTrade" checked={fairTrade} onChange={({ target }) => setFairTrade(target.checked)} />}
              label={"Fair Trade"}
              labelPlacement="bottom"
              color="primary"
            />

            <FormControlLabel
              control={<Checkbox id="organic" required checked={organic} onChange={({ target }) => setOrganic(target.checked)} />}
              label={"Organic"}
              labelPlacement="bottom"
              color="primary"
            />

            <FormControlLabel
              control={<Checkbox id="shadeGrown" required checked={shadeGrown} onChange={({ target }) => setShadeGrown(target.checked)} />}
              label={"Shade Grown"}
              labelPlacement="bottom"
              color="primary"
            />
          </Box>

          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </Box>
    </Box>
  )
}

export default withFirebase(Add)