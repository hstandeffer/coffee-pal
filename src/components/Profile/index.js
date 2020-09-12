import React from 'react';
import { withAuthorization } from '../Session';

import ProductGrid from '../Product/ProductGrid';

const ProfilePage = () => {
  console.log('hi')
  return (
    <ProductGrid route={'coffee'} heading={'Your Saved Coffees'}/>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage)