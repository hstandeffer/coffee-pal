import React, { useState, useEffect } from 'react'
import { withFirebase } from '../Firebase'

import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { ProductLink, BrowseHitsDiv, BrowseWrapper, FlexContainer } from '../Browse/style'
import { TastingWrapper, TastingDiv } from '../Tasting/style'
import Typography from '@material-ui/core/Typography'
import { Box, Button, Link } from '@material-ui/core'

import * as ROUTES from '../../constants/routes'

const ProductGrid = ({ firebase, route, heading, subheading }) => {
  // const [search, setSearch] = useState('')
  const [coffees, setCoffees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    firebase.userCoffees(firebase.auth.currentUser.uid).once('value')
      .then((snapshot) => {
        const coffeeIdsObject = snapshot.val()
        const coffeeIdsList = Object.keys(coffeeIdsObject).map(key => ({
          ...coffeeIdsObject[key],
          uid: key,
        }))
        coffeeIdsList.forEach((item) => {
          firebase.coffee(item.uid).once('value')
            .then((snapshot) => {
              setCoffees(c => c.concat({...snapshot.val(), uid: item.uid})) // functional update using previous value to update
            })
        })
        setLoading(false)
      })
  }, [firebase])

  return (
    <TastingWrapper>
      <TastingDiv>
        <Box pt={4}>
          <Typography variant="h3" component="h1">{heading}</Typography>
        </Box>
        <h3>{subheading}</h3>
        <Box textAlign="center">
          <Link to={ROUTES.ADD_COFFEE}>
            <Button variant="contained" size="large" color="primary">Add New Coffee</Button>
          </Link>
        </Box>
        <BrowseWrapper>
          <BrowseHitsDiv>
            <FlexContainer>
            {!loading && coffees ? 
                coffees.map(coffee => (
                  <CoffeeItem key={coffee.uid} coffee={coffee} route={route} />
                ))
              : <h2>Loading Coffees...</h2>
            }
            </FlexContainer>
          </BrowseHitsDiv>
        </BrowseWrapper>
      </TastingDiv>
    </TastingWrapper>
  )
}

export const CoffeeItem = ({ coffee, route }) => {
  return (
    <FlexProductDiv>
      <ProductLink to={`/${route ? route : 'tasting'}/${coffee.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}/${coffee.uid}`}>
        <ImageContainer>
          <ImageContentContainer>
            <img src={coffee.imageUrl} alt={coffee.title} />
          </ImageContentContainer>
        </ImageContainer>
        <InfoContainer>
          <div style={{height: '40px', overflow: 'hidden', fontWeight: 'bold'}}>{coffee.title}</div>
          <div style={{margin: '5px 0'}}>${coffee.price}</div>
          {coffee.roastType && <div style={{margin: '5px 0', textTransform: 'capitalize'}}>{coffee.roastType} roast</div>}
        </InfoContainer>
      </ProductLink>
    </FlexProductDiv>
  )
}


export default withFirebase(ProductGrid)