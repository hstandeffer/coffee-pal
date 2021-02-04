import { Slider } from '@material-ui/core'
import React from 'react'
import { AlgoliaRefinementHeader, AlgoliaRefinementListWrapper } from '../Browse/style'

const PriceFilter = ({ minPrice, maxPrice, header, items, setItems, priceRange, handlePriceChange }) => (
  <AlgoliaRefinementListWrapper>
    <AlgoliaRefinementHeader>
      {header}
    </AlgoliaRefinementHeader>
    <Slider
      value={priceRange}
      onChange={(event, newValue) => setItems({...items, priceRange: newValue})}
      onChangeCommitted={(event, newValue) => handlePriceChange(newValue)}
      valueLabelDisplay="auto"
      marks={[{value: minPrice, label: `$${minPrice}`}, {value: maxPrice, label: `$${maxPrice}`}]}
      min={minPrice}
      max={maxPrice}
    />
  </AlgoliaRefinementListWrapper>
)

export default PriceFilter