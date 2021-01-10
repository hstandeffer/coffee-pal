import React, { useState, useEffect } from 'react'
import { withAuthorization } from '../Session'
import {
  FlexContainer,
  FlexProductDiv,
  ImageContainer,
  ImageContentContainer,
  InfoContainer
} from './style'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import Hidden from '@material-ui/core/Hidden'
import { BrowseWrapper, BrowseFiltersDiv, TestDiv, BrowseFiltersHeaderDiv, ClearRefinementsButton, AlgoliaStyledUl, AlgoliaAllRefinementListsWrapper, AlgoliaRefinementListWrapper, AlgoliaStyledLi, AlgoliaStyledOuterRefinementListSpan, AlgoliaStyledRefinementListCountSpan, AlgoliaRefinementHeader, BrowseHitsDiv, ProductLink, TestButton, MobileFiltersButtonWrapper, ClearRefinementsButtonMobile, SaveFiltersButtonMobile, TestFooter } from '../Browse/style'
import { Box } from '@material-ui/core'

const SearchPage = () => {
  const [filters, setFilters] = useState([])
  const [roastTypes, setRoastTypes] = useState([{ label: 'Light Roast', value: 'light', isRefined: false}, { label: 'Medium Roast', value: 'medium', isRefined: false}, { label: 'Dark Roast', value: 'dark', isRefined: false}])
  const [filtering, setFiltering] = useState(false)
  const [priceRange, setPriceRange] = useState([1, 20])
  
  const minPrice = 1
  const maxPrice = 20

  const handleChange = async (event) => {
    if (filters.includes(event.target.value)) {
      setFilters(filters.filter(f => f !== event.target.value))
    }
    else {
      setFilters(filters.concat(event.target.value))
    }
    setRoastTypes(roastTypes.map(roast => roast.value === event.target.value ? {...roast, isRefined: !roast.isRefined } : roast))
  }

  const handlePriceChange = async (newValue) => {
    setPriceRange(newValue)
  }

  const clearFiltersAndRefinements = async (event) => {
    setFilters([])
    setRoastTypes(roastTypes.map(roast => ({...roast, isRefined: false})))
    setPriceRange([minPrice, maxPrice])
  }

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
            <ClearFilters filters={filters} clearFiltersAndRefinements={clearFiltersAndRefinements} />
          </BrowseFiltersHeaderDiv>
          {/* Insert current filters here later - will require restructuring */}
          <AlgoliaAllRefinementListsWrapper>
            <FilterList header={'Roast Type'} roastTypes={roastTypes} handleChange={handleChange} />
            <PriceFilter minPrice={minPrice} maxPrice={maxPrice} header={'Price'} priceRange={priceRange} handlePriceChange={handlePriceChange} />
          </AlgoliaAllRefinementListsWrapper>
          <TestFooter filtering={filtering}>
            <ClearFiltersMobile />
            <SaveFiltersMobile onClick={() => setFiltering(false)} />
          </TestFooter>
        </TestDiv>
      </BrowseFiltersDiv>

      <BrowseHitsDiv>
        <Search filters={filters} filtering={filtering} />
      </BrowseHitsDiv>
    </BrowseWrapper>
  )
}

const PriceFilter = ({ minPrice, maxPrice, header, priceRange, handlePriceChange }) => (
  <AlgoliaRefinementListWrapper>
    <AlgoliaRefinementHeader>
      {header}
    </AlgoliaRefinementHeader>
    <Slider
      value={priceRange}
      onChange={(event, newValue) => handlePriceChange(newValue)}
      valueLabelDisplay="auto"
      marks={[{value: minPrice, label: `$${minPrice}`}, {value: maxPrice, label: `$${maxPrice}`}]}
      min={1}
      max={20}
    />
  </AlgoliaRefinementListWrapper>
)

const FilterList = ({ header, handleChange, roastTypes }) => (
  <AlgoliaRefinementListWrapper>
    <AlgoliaRefinementHeader>
      {header}
    </AlgoliaRefinementHeader>
    <AlgoliaStyledUl>
      {roastTypes.map(roast => (
        <AlgoliaStyledLi key={roast.label}>
          <label>
            <input type="checkbox" checked={roast.isRefined} value={roast.value} onChange={handleChange} />
            <AlgoliaStyledOuterRefinementListSpan>
              <span style={{fontWeight: roast.isRefined ? '700' : ''}}>
                {roast.label}
              </span>
            </AlgoliaStyledOuterRefinementListSpan>
            {/* <AlgoliaStyledRefinementListCountSpan>
              {roast.count}
            </AlgoliaStyledRefinementListCountSpan> */}
          </label>
        </AlgoliaStyledLi>
      ))}
    </AlgoliaStyledUl>
  </AlgoliaRefinementListWrapper>
)

const ClearFilters = ({ clearFiltersAndRefinements, filters }) => (
  <ClearRefinementsButton onClick={clearFiltersAndRefinements} disabled={!filters.length}>
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

const ClearFiltersMobile = ({ clearFiltersAndRefinements }) => (
  <MobileFiltersButtonWrapper>
    <ClearRefinementsButtonMobile onClick={clearFiltersAndRefinements}>Reset Filters</ClearRefinementsButtonMobile>
  </MobileFiltersButtonWrapper>
)

const SaveFiltersMobile = ({ onClick }) => (
  <MobileFiltersButtonWrapper>
    <SaveFiltersButtonMobile onClick={onClick}>
      View coffees
    </SaveFiltersButtonMobile>
  </MobileFiltersButtonWrapper>
)

// this is kept separate so when loading, it'll only hide the products being shown, not the entire page
// might make more sense to rename as Products
const Search = ({ filters, filtering }) => {
  // const [searchQuery, setSearchQuery] = useState('') // TODO: ADD SEARCH QUERY TO FILTERS
  const [loading, setLoading] = useState(false)
  const [coffees, setCoffees] = useState([])

  useEffect(() => {
    const getQuery = async () => {
      setLoading(true)
      const response = await axios.get('/api/coffees/query', { params: { roastType: filters } })
      setCoffees(response.data)
      setLoading(false)
    }
    getQuery()
  }, [filters])

  if (loading) {
    return <p>Loading...</p>
  }

  // this hides the products so they aren't shown behind the mobile filter view
  if (filtering) {
    return null
  }

  return (
    <FlexContainer>
      {coffees.filter(coffee => filters.length !== 0 ? filters.includes(coffee.roastType) : coffee).map(coffee => (
          <CoffeeItem coffee={coffee} key={coffee.id} />
        ))}
    </FlexContainer>
  )
}

const CoffeeItem = ({ coffee }) => (
  <FlexProductDiv>
    <ProductLink to={`/coffees/${coffee.id}`}>
      <ImageContainer>
        <ImageContentContainer>
          <img src={`${process.env.REACT_APP_IMAGE_PATH}/${coffee.imagePath ? coffee.imagePath : coffee.roaster.imagePath}`} alt={coffee.coffeeName} />
        </ImageContentContainer>
      </ImageContainer>
      <InfoContainer>
        <Box height='40px' overflow='hidden' fontWeight='bold'>{coffee.coffeeName}</Box>
        <Box margin='5px 0'>${coffee.price}</Box>
        <Box margin='5px 0' style={{textTransform: 'capitalize'}}>{coffee.roastType} roast</Box>
      </InfoContainer>
    </ProductLink>
  </FlexProductDiv>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(SearchPage)