import React from 'react'
import { RefinementHeader, RefinementListWrapper, StyledLi, StyledOuterRefinementListSpan, StyledUl } from './style'

const FilterList = ({ header, handleChange, items }) => (
  <RefinementListWrapper>
    <RefinementHeader>
      {header}
    </RefinementHeader>
    <StyledUl>
      {items.map(item => (
        <StyledLi key={item.label}>
          <label>
            <input type="checkbox" checked={item.isRefined} value={item.value} onChange={handleChange} />
            <StyledOuterRefinementListSpan>
              <span style={{fontWeight: item.isRefined ? '700' : ''}}>
                {item.label}
              </span>
            </StyledOuterRefinementListSpan>
            {/* <StyledRefinementListCountSpan>
              {item.count}
            </StyledRefinementListCountSpan> */}
          </label>
        </StyledLi>
      ))}
    </StyledUl>
  </RefinementListWrapper>
)

export default FilterList