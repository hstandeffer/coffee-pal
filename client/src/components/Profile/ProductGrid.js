import React from 'react'

import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { BrowseHitsDiv, FlexContainer, ProductLink } from '../Browse/style'
import { ProductWrapper, ProductGridDiv } from '../Product/style'
import Typography from '@material-ui/core/Typography'
import { Box, Button, Fade } from '@material-ui/core'
import { Link } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/CancelSharp';

import * as ROUTES from '../../constants/routes'
import CoffeeBeanSvg from '../../shared/components/CoffeeBeanSvg'
import { assetUrl } from '../../shared/utils/url'

const ProductGrid = ({ coffees, route, heading, handleRemove, editing, setEditing }) => {
  return (
    <ProductGridDiv>
        <Box>
          <Typography align='center' variant="h5" component="h2">{heading}</Typography>
      { coffees.length !== 0 ?
        <Button onClick={() => setEditing(!editing)} size="small" variant="text">{editing ? 'stop editing' : 'edit'}</Button>
        : null
      }
        </Box>
      <ProductWrapper>
        <BrowseHitsDiv>
          <FlexContainer>
          {coffees.length === 0 ?
            <Box width="100%" py={2} align="center">
              <Typography variant="body1">No saved coffees, try adding one from the <Link to={ROUTES.BROWSE}>browse page</Link>!</Typography>
            </Box> :
            coffees.map(coffee => (
              <CoffeeItem editing={editing} handleRemove={handleRemove} key={coffee.id} coffee={coffee} route={route} />
            ))
          }
          </FlexContainer>
        </BrowseHitsDiv>
      </ProductWrapper>
    </ProductGridDiv>
  )
}

export const CoffeeItem = ({ coffee, route, editing, handleRemove }) => {
  return (
    <FlexProductDiv data-testid="profile:coffeeItem">
      {editing ?
        <Fade style={{ zIndex: 10 }} in={editing}>
          <Box position="relative">
            <Box component="span" position="absolute" top="0" right="0" marginRight="-7px" marginTop="-7px">
              <CancelIcon onClick={() => handleRemove(coffee.id)} style={{ color: '#f83e3e', cursor: 'pointer' }}/>
            </Box>
          </Box>
        </Fade> : null
      }
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

export default ProductGrid