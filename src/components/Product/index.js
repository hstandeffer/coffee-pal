import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { withFirebase } from '../Firebase/context'

import { Wrapper } from './style'
import { Image } from '../Search/style'

import { Grid } from '@material-ui/core'

const Product = ({ firebase }) => {
  let { id } = useParams()
  const [coffee, setCoffee] = useState()
  const [loading, setLoading] = useState(false)

  const onFavoriteClick = (coffeeId) => {
    firebase.userCoffees(firebase.auth.currentUser.uid, coffeeId).set(true)
  }
  
  useEffect(() => {
    setLoading(true)
    firebase.coffee(id).once('value', snapshot => {
      if (snapshot.val()) {
        const coffeeObject = snapshot.val()
        coffeeObject['uid'] = snapshot.key
        
        setCoffee(coffeeObject)
        setLoading(false)
      }
    })
  }, [firebase, id])

  if (loading || !coffee) {
    return <p>Loading...</p>
  }
  return (
    <Wrapper>
      <Grid container>
        <Grid item md={7} sm={12}>
          <Image src={coffee.imageUrl} />
        </Grid>
        <Grid style={{padding: '0 20px'}} item md={5} sm={12}>
          <p style={{fontWeight: 'bold', padding: '10px 0', margin: '0', fontSize: '2.5rem'}}>{coffee.title}</p>
          <p style={{fontSize: '1rem'}}>{coffee.siteName}</p>
          <p>{`Price: $${coffee.price}`}</p>
          <p style={{textTransform: 'capitalize'}}>{coffee.roastType && `${coffee.roastType} roast`}</p>
          <p>{coffee.countries && `Countries: ${coffee.countries.join(',')}`}</p>
          <p>{`Fair Trade: ${coffee.fairTrade ? 'Yes' : 'No'}`}</p>
          <p>{`Organic: ${coffee.organic ? 'Yes' : 'No'}`}</p>
          <p>{`Shade Grown: ${coffee.shadeGrown ? 'Yes' : 'No'}`}</p>
          <p>{`Single Origin: ${coffee.singleOrigin ? 'Yes' : 'No'}`}</p>
          <p>{`Blend: ${coffee.blend ? 'Yes' : 'No'}`}</p>
          <button onClick={() => onFavoriteClick(coffee.uid)}>Add To List</button>
          <a href={`${coffee.url}`}>
            <button>Buy on {coffee.siteName}</button>
          </a>
          {console.log(JSON.stringify(coffee))}
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default withFirebase(Product);