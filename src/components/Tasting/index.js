import React, { useState } from 'react'

import { TastingWrapper, TastingDiv } from './style'
import { Input } from '../../shared-style'

const Tasting = () => {
  const [search, setSearch] = useState('')

  return (
      <TastingWrapper>
      <TastingDiv>
        <h1>Start a new tasting</h1>
        <Input value={search} onChange={({ target }) => setSearch(target.value)} placeholder='search for a coffee to get started'/>
      </TastingDiv>
    </TastingWrapper>
  )
}

export default Tasting