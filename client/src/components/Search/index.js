import React, { useState, useEffect, useMemo } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';
import {
  FlexContainer,
  FlexProductDiv,
  FiltersWrapper,
  FiltersDiv,
  StyledH2,
  ItemsDiv,
  ImageContainer,
  ImageContentContainer,
  InfoContainer
} from './style'

import userService from '../../services/user'
import coffeeService from '../../services/coffee'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

import TemporaryDrawer from './TemporaryDrawer'

export const Filters = ({ filters, setFilters }) => {
  // TODO: add range slider component for price filter

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked
    })
  }

  const { fairTrade, shadeGrown, organic, lightRoast, mediumRoast, darkRoast } = filters

  return (
    <FiltersWrapper>
      <StyledH2>Filters</StyledH2>
   
      <FormGroup>
        <Typography component="h2">
          <strong>Growing Methods</strong>
        </Typography>
        <Divider />
        <FormControlLabel 
          control={
            <Checkbox name="fairTrade" color="primary" value={fairTrade} onChange={handleChange} />
          }
          label="Fair Trade"
        />
        <FormControlLabel
          control={
            <Checkbox name="shadeGrown" color="primary" value={shadeGrown} onChange={handleChange} />
          }
          label="Shade Grown" />
        <FormControlLabel
          control={
            <Checkbox name="organic" color="primary" value={organic} onChange={handleChange} />
          }
          label="Organic" />
      </FormGroup>
      <br/>
      <FormGroup>
        <Typography component="h2">
          <strong>Roast Type</strong>
        </Typography>
        <Divider />
        <FormControlLabel
          control={
            <Checkbox name="lightRoast" color="primary" value={lightRoast} onChange={handleChange} />
          }
          label="Light" />
        <FormControlLabel
          control={
            <Checkbox name="mediumRoast" color="primary" value={mediumRoast} onChange={handleChange} />
          }
          label="Medium" />
        <FormControlLabel
          control={
            <Checkbox name="darkRoast" color="primary" value={darkRoast} onChange={handleChange} />
          }
          label="Dark" />
      </FormGroup>
    </FiltersWrapper>
  )
}

const SearchPage = () => {
  const [filters, setFilters] = useState({})

  return (
    <>
      <Grid container direction="row" justify="center">
        <Hidden smDown>
          <Grid item md={3}>
            <FiltersDiv>              
              <Filters filters={filters} setFilters={setFilters} />
            </FiltersDiv>
          </Grid>
        </Hidden>
        <Grid item md={9} sm={12}>
          <ItemsDiv>
            <Hidden mdUp>
              <TemporaryDrawer filters={filters} setFilters={setFilters} />
            </Hidden>
            <Search filters={filters} />
          </ItemsDiv>
        </Grid>
      </Grid>
    </>
  )
}

const SearchBase = ({ firebase, filters }) => {
  // const [searchQuery, setSearchQuery] = useState('') // TODO: ADD SEARCH QUERY TO FILTERS
  const [loading, setLoading] = useState(false)
  const [coffees, setCoffees] = useState([])

  const filteredCoffees = useMemo(() => {
    const trueFilters = {}
    Object.keys(filters).forEach(k => {
      if (filters[k] === true) {
        trueFilters[k] = filters[k]
      }
    })
    return coffees.filter((coffee) => {
      let roastFound = false

      if (coffee.roastType === 'light' && trueFilters.lightRoast) {
        roastFound = true
      }

      if (coffee.roastType === 'medium' && trueFilters.mediumRoast) {
        roastFound = true
      }

      if (coffee.roastType === 'dark' && trueFilters.darkRoast) {
        roastFound = true
      }

      if (!trueFilters.organic && !trueFilters.shadeGrown && !trueFilters.fairTrade) {
        return roastFound
      }
      else {
        if (trueFilters.organic && !coffee.organic) {
          return false
        }
        if (trueFilters.fairTrade && !coffee.fairTrade) {
          return false
        }
        if (trueFilters.shadeGrown && !coffee.shadeGrown) {
          return false
        }

        if (!trueFilters.lightRoast && !trueFilters.mediumRoast && !trueFilters.darkRoast) {
          return true
        }
        else {
          return roastFound
        }
      }
    })
  }, [coffees, filters])

  useEffect(() => {
    const getCoffees = async () => {

      setLoading(true)
      const coffeeList = await coffeeService.getAll()
      
      setCoffees(coffeeList)
      setLoading(false)
    }
    getCoffees()
  }, [])

  const onFavoriteClick = (coffeeId) => {
    userService.saveCoffee(coffeeId)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <CoffeeList coffees={filteredCoffees.length > 0 ? filteredCoffees : coffees} onFavoriteClick={onFavoriteClick} />
  )
}

const CoffeeList = ({ coffees, onFavoriteClick }) => {
  return (
    <FlexContainer>
      {coffees.map(coffee => (
          <CoffeeItem coffee={coffee} key={coffee.id} onFavoriteClick={onFavoriteClick} />
        ))}
    </FlexContainer>
  )
}

const CoffeeItem = ({ coffee, onFavoriteClick }) => (
  <FlexProductDiv>
    <ImageContainer>
      <ImageContentContainer>
        <img src={coffee.imageUrl} alt={coffee.coffeeName} />
      </ImageContentContainer>
    </ImageContainer>
    <InfoContainer>
      <div style={{height: '40px', overflow: 'hidden', fontWeight: 'bold'}}>{coffee.coffeeName}</div>
      <div style={{margin: '5px 0'}}>${coffee.price}</div>
      <div style={{margin: '5px 0', textTransform: 'capitalize'}}>{coffee.roastType} roast</div>
      <div>
        <button onClick={() => onFavoriteClick(coffee.id)}>Favorite</button>
      </div>
    </InfoContainer>
  </FlexProductDiv>
)

const Search = compose(
  withRouter,
  withFirebase,
)(SearchBase)

const condition = authUser => !!authUser

export default withAuthorization(condition)(SearchPage)