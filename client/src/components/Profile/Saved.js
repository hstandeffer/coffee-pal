import React from 'react'
import { Box } from '@material-ui/core'
import ProductGrid from '../Product/ProductGrid'

export const SavedCoffees = ({ coffees }) => (
  <Box>
    <ProductGrid coffees={coffees} route={'coffees'} heading={'Your Saved Coffees'}/>
  </Box>
)

export default SavedCoffees