import React from 'react'
import withAuthorization from '../Session/withAuthorization'

import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { BrowseHitsDiv, FlexContainer, ProductLink } from '../Browse/style'
import { ProductWrapper, ProductGridDiv } from './style'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'

const ProductGrid = ({ coffees, route, heading, subheading }) => {
  return (
    <ProductGridDiv style={{ marginTop: '1rem' }}>
      <Box my={2}>
        <Typography variant="h4" component="h2">{heading}</Typography>
      </Box>
      <Typography variant="h6">{subheading}</Typography>
      <ProductWrapper>
        <BrowseHitsDiv>
          <FlexContainer>
          {coffees.length === 0 ?
            <Box width="100%" align="center">
              <Typography variant="h5">No saved coffees, try adding one from the <Link to={ROUTES.BROWSE}>browse page</Link>!</Typography>
            </Box> :
            coffees.map(coffee => (
              <CoffeeItem key={coffee.id} coffee={coffee} route={route} />
            ))
          }
          </FlexContainer>
        </BrowseHitsDiv>
      </ProductWrapper>
    </ProductGridDiv>
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