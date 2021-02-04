import React, { useState, useEffect } from 'react'
import { FlexContainer } from './style'
import axios from 'axios'
import { CoffeeItem } from '../Product/ProductGrid'
import FullPageSpinner from '../../shared/components/Spinner'
import { Typography } from '@material-ui/core'

// this is kept separate so when loading, it'll only hide the products being shown, not the entire page
// might make more sense to rename as Products
const Search = ({ filters, filtering }) => {
  const [loading, setLoading] = useState(false)
  const [coffees, setCoffees] = useState([])
  
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const getQuery = async () => {
        setLoading(true)
        const response = await axios.get('/api/coffees/query', 
          { params: { q: filters.q, roastType: filters.roastType, priceLow: filters.price.min, priceHigh: filters.price.max } }
        )
        setCoffees(response.data)
        setLoading(false)
      }
      getQuery()
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
      <MemoizedCoffees coffees={coffees} />
      : <Typography variant="body1">No results found.</Typography>
  )
}

const CoffeeItems = ({ coffees }) => (
  <FlexContainer>
    {coffees.map(coffee => (
      <CoffeeItem coffee={coffee} key={coffee.id} />
    ))}
  </FlexContainer>
)

const MemoizedCoffees = React.memo(CoffeeItems)

export default Search