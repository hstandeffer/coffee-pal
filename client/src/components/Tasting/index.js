import React, { useState, useEffect } from 'react'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose';

import { TastingWrapper, TastingDiv } from './style'
import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { ProductLink, BrowseHitsDiv, BrowseWrapper, FlexContainer } from '../Browse/style'
import Typography from '@material-ui/core/Typography';

import { withAuthorization } from '../Session';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const Tasting = ({ firebase }) => {
  // const [search, setSearch] = useState('')
  const [coffees, setCoffees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    firebase.userCoffees(firebase.auth.currentUser.uid).once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
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
        }
        setLoading(false)
      })
  }, [firebase])

  return (
      <TastingWrapper>
      <TastingDiv>
        <Box p={4}>
          <Typography variant="h3" component="h3">Coffee Tasting</Typography>
          <Typography variant="h5" component="h5">Select from your saved coffees to get started</Typography>
        </Box>
        <BrowseWrapper>
          <BrowseHitsDiv>
            <FlexContainer>
            {!loading ?
                coffees.length === 0 ?
                  <Box width="100%" align="center">
                    <Typography variant="h5">No saved coffees, try adding one from the <Link to={ROUTES.BROWSE}>browse page</Link>!</Typography>
                  </Box> :
                  coffees.map(coffee => (
                    <CoffeeItem key={coffee.uid} coffee={coffee} />
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

export const CoffeeItem = ({ coffee, route }) => (
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

const TastingPage = compose(withFirebase)(Tasting)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(TastingPage)