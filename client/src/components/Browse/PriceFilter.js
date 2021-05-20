import { Slider } from '@material-ui/core'
import React from 'react'
import { RefinementHeader, RefinementListWrapper } from './style'

const PriceFilter = ({ minPrice, maxPrice, header, items, setItems, priceRange, handlePriceChange }) => (
  <RefinementListWrapper>
    <RefinementHeader>
      {header}
    </RefinementHeader>
    <Slider
      value={priceRange}
      onChange={(event, newValue) => setItems({...items, priceRange: newValue})}
      onChangeCommitted={(event, newValue) => handlePriceChange(newValue)}
      valueLabelDisplay="auto"
      marks={[{value: minPrice, label: `$${minPrice}`}, {value: maxPrice, label: `$${maxPrice}`}]}
      min={minPrice}
      max={maxPrice}
    />
  </RefinementListWrapper>
)

export default PriceFilter