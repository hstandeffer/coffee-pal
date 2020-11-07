import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import coffeeService from '../../services/coffee'
import userService from '../../services/user'

import { ImageContainer, ImageContentContainer } from '../Search/style'

import { Grid, Hidden, Button, Typography, Link, Box } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Product = () => {
  let { id } = useParams()
  const [coffee, setCoffee] = useState()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const onFavoriteClick = (coffeeId) => {
    userService.saveCoffee(coffeeId)
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
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
    return <p>Loading...</p>
  }
  return (
    <Box mx={8} pt={4}>
      <Grid container justify="flex-start" spacing={8}>
        <Grid item sm={4} xs={12}>
          <Hidden smUp>
            <Typography variant="h4" component="p" align="center" gutterBottom m={0}>{coffee.title}</Typography>
          </Hidden>
          <ImageContainer>
            <ImageContentContainer>
              <img onError={(e) => e.target.src = "https://freepikpsd.com/wp-content/uploads/2019/10/coffee-bag-png-7-Transparent-Images.png"} src={coffee.imageUrl} alt={coffee.title} />
            </ImageContentContainer>
          </ImageContainer>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Hidden xsDown>
            {coffee.title && <Typography variant="h4" component="p" align="left" m={0}>{coffee.title}</Typography>}
          </Hidden>
          {coffee.siteName && <Typography variant="h6" component="p" gutterBottom>{coffee.siteName}</Typography>}
          {coffee.price && <Typography gutterBottom component="p">${coffee.price}</Typography>}
          {coffee.roastType && <Typography gutterBottom component="p" style={{textTransform: 'capitalize'}}>{coffee.roastType} Roast</Typography>}
          {coffee.countries && <Typography gutterBottom component="p"><strong>Countries: </strong>{coffee.countries.join(', ')}</Typography>}
          {coffee.fairTrade && <Typography gutterBottom component="p">Fair Trade</Typography>}
          {coffee.organic && <Typography gutterBottom component="p">Organic</Typography>}
          {coffee.shadeGrown && <Typography gutterBottom component="p">Shade Grown</Typography>}
          {coffee.singleOrigin && <Typography gutterBottom component="p">Single Origin</Typography>}
          {coffee.blend && <Typography gutterBottom component="p"></Typography>}
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Button style={{height: '100%'}} fullWidth variant="outlined" color="primary" onClick={() => onFavoriteClick(coffee.uid)}>Add To List</Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <Link underline="none" href={`${coffee.url}`}>
                <Button style={{height: '100%'}} fullWidth variant="outlined" color="primary">Buy from Seller</Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={12}>
              <Link underline="none" href={`/tasting/${coffee.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}/${coffee.uid}`}>
                <Button style={{height: '100%'}} fullWidth variant="outlined" color="primary">Begin Tasting</Button>
              </Link>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {coffee.title} has been added to your list!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Product