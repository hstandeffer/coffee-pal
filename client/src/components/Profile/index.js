import React, { useState, useEffect} from 'react'
import { Box, Typography, FormLabel, Button, MenuItem, Select } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { InputWithLabelAbove, StyledButton } from '../../shared-style'
import FullPageSpinner from '../../shared/components/Spinner'
import { makeStyles } from '@material-ui/styles'
import userService from '../../services/user'
import Alert from '@material-ui/lab/Alert'
import Toast from '../../shared/components/Toast'
import Seo from '../../shared/components/Seo'

const useStyles = makeStyles(() => ({
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
}))

const ProfilePage = ({ user }) => {
  const [image, setImage] = useState()
  const [imagePath, setImagePath] = useState('')
  const [name, setName] = useState('')
  const [favoriteCoffee, setFavoriteCoffee] = useState('')
  const [favoriteBrewing, setFavoriteBrewing] = useState('')


  const ref = React.useRef()
  
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const classes = useStyles()

  useEffect(() => {
    setLoading(true)
    setName(user.name || '')
    setImagePath(user.imagePath || null)
    setFavoriteCoffee(user.favorite_coffee_type || '')
    setFavoriteBrewing(user.favorite_brewing_method || '')
    setLoading(false)
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('userImage', image)
    data.append('name', name)
    data.append('favoriteCoffee', favoriteCoffee)
    data.append('favoriteBrewing', favoriteBrewing)

    const response = await userService.update(data).catch((err) => {
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
    ref.current.value = ''
  }

  const handleUpload = async event => {
    setImage(event.target.files[0])
  }

  if (loading) {
    return <FullPageSpinner size={50} />
  }

  return (
    <Box maxWidth="480px" px="2.5rem" mb="2.5rem" mx="auto" borderRadius="4px">
      <Seo title={'Your Profile'} />
      <Typography align='center' variant="h5" component="h2">Your Profile</Typography>
      <Box textAlign="left" mt="1rem">
        <form onSubmit={handleSubmit}>
          <FormLabel>Avatar</FormLabel>
          <Box mt="5px" mb="1rem" display="flex" flexDirection="row" alignItems="center">
            {user.imagePath ?
              <Avatar style={{ marginRight: '15px' }} src={`${process.env.REACT_APP_IMAGE_PATH}/${imagePath}`} /> :
              <Avatar style={{ marginRight: '15px' }}>{user.username.charAt(0)}</Avatar> 
            }
            <Typography style={{ fontWeight: 500 }}>Change Avatar Picture</Typography>
            <Button style={{ marginLeft: '15px' }} variant="outlined">
              <input ref={ref} onChange={handleUpload} style={{ inset: '0px', width: '100%', cursor: 'pointer', position: 'absolute', opacity: 0 }} type="file" />Upload
            </Button>
          </Box>

          <FormLabel htmlFor="name">Name</FormLabel>
          <InputWithLabelAbove name="name" value={name} onChange={({ target }) => setName(target.value)}/>

          <FormLabel htmlFor="favoriteCoffee">Favorite Coffee Type</FormLabel>
          <Select
            classes={{ outlined: classes.outlined }}
            id="favoriteCoffee"
            value={favoriteCoffee}
            onChange={({ target }) => setFavoriteCoffee(target.value)}
            style={{ width: '100%', margin: '5px auto 15px' }}
            variant="outlined"
          >
            <MenuItem value="drip">Drip Coffee</MenuItem>
            <MenuItem value="espresso">Espresso</MenuItem>
            <MenuItem value="cappuccino">Cappuccino</MenuItem>
            <MenuItem value="latte">Latte</MenuItem>
            <MenuItem value="flatWhite">Flat White</MenuItem>
            <MenuItem value="americano">Americano</MenuItem>
            <MenuItem value="coldBrew">Cold Brew</MenuItem>
          </Select>

          <FormLabel htmlFor="favoriteBrewing">Favorite Brewing Method</FormLabel>
          <Select
            classes={{ outlined: classes.outlined }}
            id="favoriteBrewing"
            value={favoriteBrewing}
            onChange={({ target }) => setFavoriteBrewing(target.value)}
            style={{ width: '100%', margin: '5px auto 15px' }}
            variant="outlined"
          >
            <MenuItem value="aeropress">Aeropress</MenuItem>
            <MenuItem value="pourover">Pourover</MenuItem>
            <MenuItem value="frenchPress">French Press</MenuItem>
            <MenuItem value="espresso">Espresso Machine</MenuItem>
            <MenuItem value="mokaPot">Moka Pot</MenuItem>
            <MenuItem value="drip">Drip Machine</MenuItem>
          </Select>

          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }

          <StyledButton type="submit">Update Profile</StyledButton>
        </form>
      </Box>
      <Toast open={open} setOpen={setOpen} severity="success" message="Your profile has been successfully updated." />
    </Box>
  )
}

export default ProfilePage