import React, { useState, useEffect } from 'react'
import Hidden from '@material-ui/core/Hidden'
import {
  TestDiv,
  AlgoliaSearchBarDiv,
  AlgoliaSearchBarForm,
  AlgoliaSearchBarInput,
  AlgoliaSearchBarSubmitButton,
  AlgoliaPoweredByImage,
  AlgoliaPoweredByLink,
  AlgoliaStyledStats,
  AlgoliaStyledUl,
  AlgoliaStyledCurrentRefinementOuterSpan,
  AlgoliaStyledLi,
  AlgoliaStyledOuterRefinementListSpan,
  AlgoliaStyledRefinementListCountSpan,
  TestButton,
  TestFooter,
  FlexContainer,
  AlgoliaRefinementHeader,
  AlgoliaRefinementListWrapper,
  AlgoliaAllRefinementListsWrapper,
  SaveFiltersButtonMobile,
  MobileFiltersButtonWrapper,
  ClearRefinementsButtonMobile,
  BrowseWrapper,
  BrowseFiltersDiv,
  BrowseHitsDiv,
  ClearRefinementsButton,
  BrowseFiltersHeaderDiv,
  ProductLink
} from '../Browse/style'

import {
  FlexProductDiv,
  ImageContainer,
  ImageContentContainer,
  InfoContainer
} from '../Search/style';

import userService from '../../services/user'
import coffeeService from '../../services/coffee'

const Search = () => {
  const [filtering, setFiltering] = useState(false)
  const [coffees, setCoffees] = useState()
  const [filters, setFilters] = useState({ roastType: { isRefined: false, value: 'light', label: 'Roast Type' }} )
  const [loading, setLoading] = useState()
  
  useEffect(() => {
    const getCoffees = async () => {

      setLoading(true)
      const coffeeList = await coffeeService.getRecent()
      
      setCoffees(coffeeList)
      setLoading(false)
    }
    getCoffees()
  }, [])


  return (
    <BrowseWrapper>
      <Hidden mdUp>
        <TestButton filtering={filtering} onClick={() => setFiltering(!filtering)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14"><path d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z" stroke="#fff" strokeWidth="1.29" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Show Filters
        </TestButton>
      </Hidden>
      <BrowseFiltersDiv>
        <TestDiv filtering={filtering}>
          <BrowseFiltersHeaderDiv>
            <h2>Filters</h2>
            <ClearRefinements filters={filters} setFilters={setFilters} />
          </BrowseFiltersHeaderDiv>
          <CustomCurrentRefinements />
          <AlgoliaAllRefinementListsWrapper>
            {/* <CustomRefinementList header="Brand"/> */}
            <CustomRefinementList filters={filters} setFilters={setFilters} header="Roast Type" />
          </AlgoliaAllRefinementListsWrapper>
          <TestFooter filtering={filtering}>
            {/* <CustomClearRefinementsMobile /> */}
            {/* <SaveFiltersMobile onClick={() => setFiltering(false)} /> */}
          </TestFooter>
        </TestDiv>
      </BrowseFiltersDiv>

      <BrowseHitsDiv>
        {/* <CustomSearchBox /> */}
        {/* <CustomStats /> */}
        <FlexContainer filtering={filtering}>
          {/* <CustomHits hitComponent={Hit} /> */}
        </FlexContainer>
      </BrowseHitsDiv>
    </BrowseWrapper>
  )
}

const ClearRefinements = ({ filters, setFilters }) => (
  <ClearRefinementsButton onClick={() => setFilters()} disabled={!filters.length}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 11 11"
      >
        <g fill="none" fillRule="evenodd" opacity=".4">
          <path d="M0 0h11v11H0z" />
          <path
            fill="#000"
            fillRule="nonzero"
            d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
          />
        </g>
      </svg>
      Clear filters
    </ClearRefinementsButton>
)

const CustomCurrentRefinements = ({ filters, setFilters }) => (
  <div>
    <AlgoliaStyledUl current={true}>
      {filters ? Object.entries(filters).map(([filter, v]) => (
        <li key={filter}>
          {filter}
          {/* {item.items ? (
            <>
              {item.items.map(nested => (
                <AlgoliaStyledCurrentRefinementOuterSpan key={nested.label}>
                  <span>
                    {`${item.label} ${nested.label} `}
                  </span>
                  <button
                    onClick={event => {
                      event.preventDefault();
                      refine(nested.value);
                    }}
                  >✕</button>
                </AlgoliaStyledCurrentRefinementOuterSpan>
              ))}
            </>
          ) : (
            <a
              href='/#'
              onClick={event => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              {item.label}
            </a>
          )} */}
        </li>
      )) : ''}
    </AlgoliaStyledUl>
  </div>
)

const CustomRefinementList = ({ header, filters, setFilters }) => (
  <AlgoliaRefinementListWrapper>
    <AlgoliaRefinementHeader>
      {header}
    </AlgoliaRefinementHeader>
    <AlgoliaStyledUl>
      {Object.entries(filters).map(([filter, v]) => (
          <AlgoliaStyledLi key={filter}>
            <label>
              <input type="checkbox" onChange={() => setFilters(v.value)} checked={v.isRefined} />
              <AlgoliaStyledOuterRefinementListSpan>
                <span style={{ fontWeight: v.isRefined ? '700' : '' }}>
                  {v.label}
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

export default Search