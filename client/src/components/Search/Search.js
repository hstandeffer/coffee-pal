import React, { useState, useEffect } from 'react'
import { FlexContainer } from './style'
import axios from 'axios'
import { CoffeeItem } from '../Product/ProductGrid'
import FullPageSpinner, { ButtonSpinner } from '../../shared/components/Spinner'
import { Box, Button, Typography } from '@material-ui/core'

// this is kept separate so when loading, it'll only hide the products being shown, not the entire page
// might make more sense to rename as Products
const Search = ({ filters, filtering }) => {
  const [loading, setLoading] = useState(false)
  const [coffees, setCoffees] = useState([])
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  
  const coffeeId = coffees.length > 0 ? coffees[coffees.length - 1].id : null
  
  const handleLoadMoreClick = async () => {
    setLoadMoreLoading(true)
    const response = await axios.get('/api/coffees/query', 
      { params: { coffeeId, filters: { q: filters.q, roastType: filters.roastType, priceLow: filters.price.min, priceHigh: filters.price.max }} }
    )
    setCoffees(coffees.concat(response.data))
    setLoadMoreLoading(false)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const getInitialCoffees = async () => {
        setLoading(true)
        const response = await axios.get('/api/coffees/query', 
          { params: { filters: { q: filters.q, roastType: filters.roastType, priceLow: filters.price.min, priceHigh: filters.price.max }} }
        )
        setCoffees(response.data)
        setLoading(false)
      }
      getInitialCoffees()
    }
    return () => { isMounted = false }
  }, [filters])

  if (loading) {
    return <FullPageSpinner size={50} />
  }

  // this hides the products so they aren't shown behind the mobile filter view
  if (filtering) {
    return null
  }

  return (
    coffees.length !== 0 ? 
      <CoffeeItems coffees={coffees} loadMoreLoading={loadMoreLoading} handleLoadMoreClick={handleLoadMoreClick} />
      : <Typography variant="body1">No results found.</Typography>
  )
}

const CoffeeItems = ({ coffees, handleLoadMoreClick, loadMoreLoading }) => (
  <>
    <FlexContainer>
      {coffees.map(coffee => (
        <CoffeeItem coffee={coffee} key={coffee.id} />
      ))}
    </FlexContainer>
    <Box py={1}>
      { loadMoreLoading 
        ? <Button variant="outlined" fullWidth><ButtonSpinner size="20" /></Button>
        : <Button variant="outlined" fullWidth onClick={handleLoadMoreClick}>Load More</Button>
      }
    </Box>
  </>
)

// const MemoizedCoffees = React.memo(CoffeeItems)

export default Search