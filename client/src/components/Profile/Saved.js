import React from 'react'
import { Box } from '@material-ui/core'
import ProductGrid from '../Product/ProductGrid'

export const SavedCoffees = ({ coffees }) => (
  <Box mt="2rem">
    <ProductGrid coffees={coffees} route={'coffees'} heading={'Your saved coffees'}/>
  </Box>
)

export default SavedCoffees