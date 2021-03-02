import React from 'react'

import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { BrowseHitsDiv, FlexContainer, ProductLink } from '../Browse/style'
import { ProductWrapper, ProductGridDiv, LineClampSummary } from './style'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import CoffeeBeanSvg from '../../shared/components/CoffeeBeanSvg'
import { assetUrl } from '../../shared/utils/url'

const ProductGrid = ({ coffees, route, view='saved' }) => {
  return (
    <ProductGridDiv>
      <ProductWrapper>
        <BrowseHitsDiv>
          <FlexContainer>
          {coffees.length === 0 ?
            <Box width="100%" py={2} align="center">
              {view === 'roaster' ? 
                <Typography variant="body1">No saved coffees, try adding one from the <Link to={ROUTES.BROWSE}>browse page</Link>!</Typography> :
                <Typography variant="body1">No coffees added, try <Link to={ROUTES.ADD_COFFEE}>adding one</Link>!</Typography>
              }
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
    <FlexProductDiv data-testid="search:coffeeItem">
      <ProductLink to={`/${route ? route : 'coffees'}/${coffee.id}`}>
        <ImageContainer>
          <ImageContentContainer>
            <img src={`${assetUrl}/${coffee.imagePath ? coffee.imagePath : coffee.roaster.imagePath}`} alt={coffee.coffeeName} />
          </ImageContentContainer>
        </ImageContainer>
        <InfoContainer>
          <Box textAlign="left" marginBottom="5px" height='40px' overflow="hidden" fontWeight="bold">{coffee.coffeeName}</Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <CoffeeBeanSvg roastType={coffee.roastType} />
            <Box fontWeight="fontWeightBold">${coffee.price}</Box>
          </Box>
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
            <img src={`${assetUrl}/${roaster.imagePath}`} alt={roaster.name} />
          </ImageContentContainer>
        </ImageContainer>
        <InfoContainer>
          <Box textAlign="left" marginBottom="5px" height='40px' overflow="hidden" fontWeight="bold">{roaster.name}</Box>
          <LineClampSummary>{roaster.summary}</LineClampSummary>
        </InfoContainer>
      </ProductLink>
    </FlexProductDiv>
  )
}

export default ProductGrid