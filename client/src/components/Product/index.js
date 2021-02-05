import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import coffeeService from '../../services/coffee'
import userService from '../../services/user'

import { ImageContainer, ImageContentContainer } from '../Search/style'
import FullPageSpinner from '../../shared/components/Spinner'
import Dialog from '../../shared/components/Dialog'
import Seo from '../../shared/components/Seo'
import AuthUserContext from '../Session/context'

import StarIcon from '@material-ui/icons/Star'
import LanguageIcon from '@material-ui/icons/Language'
import { Grid, Hidden, Button, Typography, Box, Container } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { assetUrl } from '../../shared/utils/url'

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Product = () => {
  let { id } = useParams()
  const [coffee, setCoffee] = useState()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const authContext = useContext(AuthUserContext)
  const [dialogOpen, setDialogOpen] = useState(false)

  const onFavoriteClick = (coffeeId) => {
    if (!authContext.isLoggedIn) {
      setDialogOpen(true)
      return
    }
    userService.saveCoffee(coffeeId)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  
  useEffect(() => {
    async function fetchCoffee() {
      setLoading(true)
      const coffeeObject = await coffeeService.get(id)
      setCoffee(coffeeObject)
      setLoading(false)
    }
    fetchCoffee()
  }, [id])

  if (loading || !coffee) {
    return <FullPageSpinner size={50} />
  }
  return (
    <Container maxWidth="md">
      <Seo title={coffee.coffeeName} />
      <Box bgcolor="rgb(0 0 0 / 0.05)" mx="auto" my="2rem" p={4} borderRadius="1rem">
        <Grid container justify="flex-start" spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Hidden smUp>
              <Typography variant="h4" component="p" align="center" gutterBottom m={0}>{coffee.coffeeName}</Typography>
            </Hidden>
            <ImageContainer>
              <ImageContentContainer>
                <img src={`${assetUrl}/${coffee.roaster.imagePath}`} alt={coffee.coffeeName} />
              </ImageContentContainer>
            </ImageContainer>
            <Box display="flex" flexDirection="row" pt={1}>
              <Button style={{ marginRight: '5px' }} fullWidth startIcon={<StarIcon />} variant="outlined" color="primary" onClick={() => onFavoriteClick(coffee.id)}>Favorite</Button>
              <Button style={{ marginLeft: '5px' }} fullWidth startIcon={<LanguageIcon />} variant="outlined" color="primary" target="_blank" href={coffee.url}>Website</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Hidden xsDown>
              {coffee.coffeeName && <Typography variant="h4" component="p" align="left" m={0}>{coffee.coffeeName}</Typography>}
            </Hidden>
            {coffee.brand && <Typography color="textPrimary" variant="h6" component="p" gutterBottom>{coffee.brand}</Typography>}
            {coffee.price && <Typography gutterBottom component="p">${coffee.price}</Typography>}
            {coffee.roastType && <Typography gutterBottom component="p" style={{textTransform: 'capitalize'}}>{coffee.roastType} Roast</Typography>}
            {coffee.countries.length > 0 && <Typography gutterBottom component="p"><strong>Countries: </strong>{coffee.countries.join(', ')}</Typography>}
            {coffee.fairTrade && <Typography gutterBottom component="p">Fair Trade</Typography>}
            {coffee.organic && <Typography gutterBottom component="p">Organic</Typography>}
            {coffee.shadeGrown && <Typography gutterBottom component="p">Shade Grown</Typography>}
            {coffee.singleOrigin && <Typography gutterBottom component="p">Single Origin</Typography>}
            {coffee.blend && <Typography gutterBottom component="p"></Typography>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {coffee.coffeeName} has been added to your list!
              </Alert>
            </Snackbar>
            <Dialog title="Sign in to add this coffee to your list" description={"Sign in or register with your email address"} open={dialogOpen} setOpen={setDialogOpen} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Product