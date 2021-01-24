import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import ProductGrid from '../Product/ProductGrid'

export const SavedCoffees = ({ coffees, handleRemove }) => {
  const [editing, setEditing] = useState(false)
  return (
    <Box>
      <ProductGrid editing={editing} setEditing={setEditing} coffees={coffees} handleRemove={handleRemove} route={'coffees'} heading={'Your Saved Coffees'}/>
    </Box>
  )
}

export default SavedCoffees