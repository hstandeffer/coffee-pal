import React from 'react'
import { AlgoliaRefinementHeader, AlgoliaRefinementListWrapper, AlgoliaStyledLi, AlgoliaStyledOuterRefinementListSpan, AlgoliaStyledUl } from '../Browse/style'

const FilterList = ({ header, handleChange, items }) => (
  <AlgoliaRefinementListWrapper>
    <AlgoliaRefinementHeader>
      {header}
    </AlgoliaRefinementHeader>
    <AlgoliaStyledUl>
      {items.map(item => (
        <AlgoliaStyledLi key={item.label}>
          <label>
            <input type="checkbox" checked={item.isRefined} value={item.value} onChange={handleChange} />
            <AlgoliaStyledOuterRefinementListSpan>
              <span style={{fontWeight: item.isRefined ? '700' : ''}}>
                {item.label}
              </span>
            </AlgoliaStyledOuterRefinementListSpan>
            {/* <AlgoliaStyledRefinementListCountSpan>
              {item.count}
            </AlgoliaStyledRefinementListCountSpan> */}
          </label>
        </AlgoliaStyledLi>
      ))}
    </AlgoliaStyledUl>
  </AlgoliaRefinementListWrapper>
)

export default FilterList