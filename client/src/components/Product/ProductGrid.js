import React, { useState, useEffect } from 'react'
import userService from '../../services/user'
import withAuthorization from '../Session/withAuthorization'

import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { BrowseHitsDiv, BrowseWrapper, FlexContainer, ProductLink } from '../Browse/style'
import { TastingWrapper, TastingDiv } from '../Tasting/style'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'

const ProductGrid = ({ route, heading, subheading }) => {
  const [coffees, setCoffees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSavedCoffees = async () => {
      setLoading(true)
      const currentUser = await userService.getCurrentUser()
      setCoffees(currentUser.saved_coffees)
      setLoading(false)
    }
    getSavedCoffees()
  }, [])

  return (
    <TastingWrapper>
      <TastingDiv style={{ marginTop: '1rem' }}>
        <Box my={2}>
          <Typography variant="h4" component="h2">{heading}</Typography>
        </Box>
        <Typography variant="h6">{subheading}</Typography>
        <BrowseWrapper>
          <BrowseHitsDiv>
            <FlexContainer>
            {!loading && coffees ?
                coffees.length === 0 ?
                  <Box width="100%" align="center">
                    <Typography variant="h5">No saved coffees, try adding one from the <Link to={ROUTES.BROWSE}>browse page</Link>!</Typography>
                  </Box> :
                  coffees.map(coffee => (
                    <CoffeeItem key={coffee.id} coffee={coffee} route={route} />
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
      <ProductLink to={`/${route ? route : 'tastings'}/${coffee.id}`}>
        <ImageContainer>
          <ImageContentContainer>
            <img src={`${process.env.REACT_APP_IMAGE_PATH}/${coffee.imagePath ? coffee.imagePath : coffee.roaster.imagePath}`} alt={coffee.coffeeName} />
          </ImageContentContainer>
        </ImageContainer>
        <InfoContainer>
          <Box height='40px' overflow="hidden" fontWeight="bold">{coffee.coffeeName}</Box>
          <Box margin="5px 0">${coffee.price}</Box>
          {coffee.roastType && <Box margin="5px 0" style={{ textTransform: 'capitalize'}}>{coffee.roastType} roast</Box>}
        </InfoContainer>
      </ProductLink>
    </FlexProductDiv>
  )
}

export const RoasterItem = ({ roaster }) => {
  return (
    <FlexProductDiv>
      <ProductLink to={`roasters/${roaster.id}`}>
        <ImageContainer>
          <ImageContentContainer>
            <img src={`${process.env.REACT_APP_IMAGE_PATH}/${roaster.imagePath}`} alt={roaster.name} />
          </ImageContentContainer>
        </ImageContainer>
        <InfoContainer>
        <Box height='40px' overflow="hidden" fontWeight="bold">{roaster.name}</Box>
          <Box margin="5px 0">{roaster.summary}</Box>
          <Box margin="5px 0" style={{ textTransform: 'capitalize'}}>{roaster.state}, {roaster.country}</Box>
        </InfoContainer>
      </ProductLink>
    </FlexProductDiv>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProductGrid)