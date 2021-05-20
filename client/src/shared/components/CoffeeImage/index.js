import React from 'react'
import { assetUrl } from '../../utils/url'

const CoffeeImage = ({ coffee }) => {
  const getFallbackSrc = (event) => {
    event.target.src = `${assetUrl}/${coffee.roaster.imagePath}`
  }

  return (
    <img
      src={coffee.imagePath ? `${assetUrl}/${coffee.imagePath}` : coffee.imageUrl ? coffee.imageUrl : `${assetUrl}/${coffee.roaster.imagePath}`}
      alt={coffee.coffeeName}
      onError={getFallbackSrc}
    />
  )
}

export default CoffeeImage