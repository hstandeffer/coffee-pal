import React, { useState, useEffect } from 'react';
import ProductGrid from '../Product/ProductGrid';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const Tasting = () => {
  const [coffees, setCoffees] = useState([])
  useEffect(() => {
    const getCoffees = async () => {
     
    }
  })
  
  return (
    <Box>
      <Box marginRight="2.5em" marginTop="1.5em" textAlign="right">
        <Link style={{textDecoration: 'none'}} to={ROUTES.ADD_COFFEE}>
          <Button variant="outlined" size="large" color="primary">Submit New Coffee</Button>
        </Link>
      </Box>
      <ProductGrid coffees={[]} route={'tastings'} heading={'Your Saved Coffees'} subheading={'Select one of your saved coffees to begin a tasting'}/>
    </Box>
  )
}

export default Tasting