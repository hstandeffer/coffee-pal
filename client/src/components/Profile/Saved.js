import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import ProductGrid from './ProductGrid'
import Seo from '../../shared/components/Seo'

export const SavedCoffees = ({ coffees, handleRemove }) => {
  const [editing, setEditing] = useState(false)
  return (
    <Box>
      <Seo title={'Your Saved Coffees'} />
      <ProductGrid editing={editing} setEditing={setEditing} coffees={coffees} handleRemove={handleRemove} route={'coffees'} heading={'Your Saved Coffees'}/>
    </Box>
  )
}

export default SavedCoffees