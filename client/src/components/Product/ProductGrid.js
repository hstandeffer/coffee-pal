import React, { useState, useEffect } from 'react'
import userService from '../../services/user'
import coffeeService from '../../services/coffee'
import withAuthorization from '../Session/withAuthorization'

import { FlexProductDiv, ImageContainer, ImageContentContainer, InfoContainer } from '../Search/style'
import { BrowseHitsDiv, BrowseWrapper, FlexContainer, ProductLink } from '../Browse/style'
import { TastingWrapper, TastingDiv } from '../Tasting/style'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'

const ProductGrid = ({ route, heading, subheading }) => {
  // const [search, setSearch] = useState('')
  const [coffees, setCoffees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSavedCoffees = async () => {
      setLoading(true)
      const response = await userService.getSavedIds()
      const coffeeIds = response.coffeeIds
      const savedCoffees = await coffeeService.getSavedCoffees(coffeeIds)
      setCoffees(savedCoffees)
      setLoading(false)
    }
    getSavedCoffees()
  }, [])

  return (
    <TastingWrapper>
      <TastingDiv style={{marginTop: '1rem'}}>
        <Box pt={4}>
          <Typography variant="h3" component="h1">{heading}</Typography>
        </Box>
        <h3>{subheading}</h3>
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
      <ProductLink to={`/${route ? route : 'tasting'}/${coffee.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}/${coffee.id}`}>
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

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProductGrid)