import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import FullPageSpinner from '../../shared/components/Spinner'
import Toast from '../../shared/components/Toast'
import { StyledButton } from '../../shared-style'
import { StyledInput, StyledTextField } from './style'

import roasterService from '../../services/roaster'
import coffeeService from '../../services/coffee'

import countryList from '../../constants/countries'

import { Box, Typography, FormLabel, Select, Link, Checkbox } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Autocomplete from '@material-ui/lab/Autocomplete'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Alert from '@material-ui/lab/Alert'
import Seo from '../../shared/components/Seo';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%'
  },
  outlined: {
    padding: '10px',
    display: 'block',
    width: '100%',
    background: '#f7f7f7',
    fontFamily: 'inherit',
    borderRadius: '4px',
    outline: 'none',
    margin: '0 auto'
  },
  hover: {
    "&:hover": {
      border: '1px solid black !important'
    }
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const Add = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [open, setOpen] = useState(false)

  const [coffeeName, setCoffeeName] = useState('')
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [brands, setBrands] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [fairTrade, setFairTrade] = useState(false)
  const [organic, setOrganic] = useState(false)
  const [shadeGrown, setShadeGrown] = useState(false)
  const [url, setUrl] = useState('')
  const [image, setImage] = useState()
  const [price, setPrice] = useState('')
  const [roastType, setRoastType] = useState('')

  const ref = React.useRef()

  useEffect(() => {
    setLoading(true)
    roasterService.getList().then(roasters => {
      setBrands(roasters)
    })
    setLoading(false)
  }, [])

  const handleUpload = async (event) => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const coffeeObj = {
      coffeeName,
      selectedBrand,
      selectedCountry,
      fairTrade,
      organic,
      shadeGrown,
      url,
      image,
      price,
      roastType,
    }

    const response = await coffeeService.add(coffeeObj).catch((err) => {
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
    setCoffeeName('')
    setSelectedBrand(null)
    setSelectedCountry([])
    setFairTrade(false)
    setOrganic(false)
    setShadeGrown(false)
    setUrl('')
    setImage(null)
    setPrice('')
    setRoastType('')
    ref.current.value = ''
  }

  if (loading) {
    return <FullPageSpinner size={50} />
  }

  return (
    <Box maxWidth="600px" p="2.5rem" my="2.5rem" mx="auto" border="1px solid #d9e7ea" borderRadius="4px" textAlign="center">
      <Seo title={'Add New Coffee'} />
      <Typography gutterBottom paragraph variant="h4" component="h2">Add New Coffee</Typography>
      <Box textAlign="left">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormLabel required htmlFor="coffeeName">Coffee Name</FormLabel>
          <StyledInput name="coffeeName" id="coffeeName" value={coffeeName} onChange={({ target }) => setCoffeeName(target.value)} />

          <FormLabel required htmlFor="brand">Brand</FormLabel>
          <Autocomplete
            id="brand"
            data-testid="brand:autocomplete"
            options={brands}
            value={selectedBrand || null}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name ? option.name : ''}
            style={{ width: '100%' }}
            onChange={(event, newValue, reason) => {
              if (reason === 'clear') {
                setSelectedBrand('')
                return
              }
              setSelectedBrand(newValue)
            }}
            size="small"
            renderInput={(params) => <StyledTextField style={{ margin: '5px auto 5px', padding: 0 }} {...params} variant="outlined" />}
          />
          <Typography paragraph variant="body2" color="textSecondary">Brand not listed?
            <Link component={RouterLink} style={{ cursor: 'pointer' }} to={`/roasters/add`}> Add it here</Link>.
          </Typography>

          <FormLabel required htmlFor="price">Price ($)</FormLabel>
          <StyledInput id="price" name="price" value={price} onChange={({ target }) => setPrice(target.value)} />

          <FormLabel required htmlFor="roastType">Roast Type</FormLabel>
          <Select
            classes={{ outlined: classes.outlined }}
            id="roastType"
            name="roastType"
            data-testid="roastType:select"
            value={roastType}
            onChange={({ target }) => setRoastType(target.value)}
            style={{ width: '100%', margin: '5px auto 15px' }}
            variant="outlined"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>

          <FormLabel htmlFor="countries">Countries</FormLabel>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.hover}
              classes={{ outlined: classes.outlined }}
              style={{ width: '100%', margin: '5px auto 15px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px' }}
              multiple
              value={selectedCountry}
              onChange={({target}) => setSelectedCountry(target.value)}
              input={<Input disableUnderline={true} />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              variant="outlined"
            >
              {countryList.map((country) => (
                <MenuItem key={country} value={country}>
                  <Checkbox checked={selectedCountry.indexOf(country) > -1} />
                  <ListItemText primary={country} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormLabel required htmlFor="url">Product URL</FormLabel>
          <StyledInput id="url" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />

          <FormLabel color="primary" htmlFor="roasterImage">Product Image</FormLabel>
          <StyledInput ref={ref} type="file" name="roasterImage" id="roasterImage" onChange={handleUpload} />

          <Box display="flex" flexDirection="row" justifyContent="space-around">
            <FormControlLabel
              control={<Checkbox id="fairTrade" color="primary" checked={fairTrade} onChange={({ target }) => setFairTrade(target.checked)} />}
              label={"Fair Trade"}
              labelPlacement="bottom"
              color="primary"
            />

            <FormControlLabel
              control={<Checkbox id="organic" color="primary" checked={organic} onChange={({ target }) => setOrganic(target.checked)} />}
              label={"Organic"}
              labelPlacement="bottom"
              color="primary"
            />

            <FormControlLabel
              control={<Checkbox id="shadeGrown" color="primary" checked={shadeGrown} onChange={({ target }) => setShadeGrown(target.checked)} />}
              label={"Shade Grown"}
              labelPlacement="bottom"
              color="primary"
            />
          </Box>
          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }

          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </Box>
      <Toast open={open} setOpen={setOpen} severity="success" message="Coffee has been successfully added" />
    </Box>
  )
}

export default Add