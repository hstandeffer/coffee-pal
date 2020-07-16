import React, { useState, useEffect, useMemo } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';
import { Wrapper, StyledDiv, StyledH1 } from '../../shared-style'
import { FlexDiv, FlexProductDiv, ImageDiv, Image, ProductInfoDiv } from './style';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'

const Filters = ({ filters, setFilters }) => {
  // TODO: add range slider component for price filter

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked
    })
  }

  const { fairTrade, shadeGrown, organic, lightRoast, mediumRoast, darkRoast } = filters

  return (
    <>
      <h2>Filters</h2>
      {/* <Input
        name="searchQuery"
        type="text"
        placeholder="Search..."
        value={searchQuery || ''}
        onChange={({ target }) => setFilters({...filters, searchQuery: target.value })}
      /> */}
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
    </>
  )
}

const SearchPage = () => {
  const [filters, setFilters] = useState({})

  return (
    <>
      <Grid container direction="row" justify="center">
        <Grid item md={3}>
          {/* need to make this page mobile accessible somehow */}
          <Wrapper>
            <StyledDiv>              
              <Filters filters={filters} setFilters={setFilters} />
            </StyledDiv>
          </Wrapper>
        </Grid>
        <Grid item md={9}>
          <Wrapper>
            <StyledDiv maxWidth={'none'}>
              <StyledH1>Browse Coffees</StyledH1>
              <Search filters={filters} />
            </StyledDiv>
          </Wrapper>
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
    setLoading(true)
    firebase.coffees().once('value', snapshot => {
      if (snapshot.exists()) {
        const coffeeObject = snapshot.val()
        const coffeesList = Object.keys(coffeeObject).map(key => ({
          ...coffeeObject[key],
          uid: key,
        }))
        
        setCoffees(coffeesList)
        setLoading(false)
      }
    })
  }, [firebase])

  const onFavoriteClick = (coffeeId) => {
    firebase.userCoffees(firebase.auth.currentUser.uid, coffeeId).set(true)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <CoffeeList coffees={filteredCoffees.length > 0 ? filteredCoffees : coffees} onFavoriteClick={onFavoriteClick} />
  )
}

// filter through each coffee and find ones matching search query in brand or name
const CoffeeList = ({ coffees, onFavoriteClick }) => {
  return (
    <FlexDiv>
      {coffees.map(coffee => (
          <CoffeeItem coffee={coffee} key={coffee.uid} onFavoriteClick={onFavoriteClick} />
        ))}
    </FlexDiv>
  )
}

const CoffeeItem = ({ coffee, onFavoriteClick  }) => {
  return (
    <FlexProductDiv>
      <ImageDiv>
        <Image src={coffee.imageUrl} />
      </ImageDiv>
      <ProductInfoDiv>
        <div>
          <span><strong>{coffee.title}</strong> - {coffee.siteName}</span>
        </div>
        <div>
          <span>{coffee.roastType}</span>
          <button style={{display:`block`}} onClick={() => onFavoriteClick(coffee.uid)}>Add to List</button>
        </div>
      </ProductInfoDiv>
    </FlexProductDiv>
  )
}

const Search = compose(
  withRouter,
  withFirebase,
)(SearchBase)

const condition = authUser => !!authUser; //shorthand for if authUser DOES NOT EQUAL null

export default withAuthorization(condition)(SearchPage);