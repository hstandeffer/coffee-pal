import React, { useState, useContext, useCallback } from 'react'
import { SubmitNewButtonDiv } from './style'
import AuthUserContext from '../Session/context'

import FilterList from './FilterList'
import PriceFilter from './PriceFilter'
import SearchBar from './SearchBar'
import Search from './Search'

import { Hidden, Button } from '@material-ui/core'
import { BrowseWrapper, BrowseFiltersDiv, TestDiv, BrowseFiltersHeaderDiv, ClearRefinementsButton, AlgoliaAllRefinementListsWrapper, BrowseHitsDiv, TestButton, MobileFiltersButtonWrapper, ClearRefinementsButtonMobile, SaveFiltersButtonMobile, TestFooter } from '../Browse/style'
import Dialog from '../../shared/components/Dialog'
import Seo from '../../shared/components/Seo'
import { useHistory } from 'react-router-dom'
import { debounce } from 'lodash'

const SearchPage = () => {
  const authContext = useContext(AuthUserContext)
  const [dialogOpen, setDialogOpen] = useState(false)

  let history = useHistory()

  const minPrice = 1
  const maxPrice = 50
  const debounceDuration = 1000

  const initialFilters = { roastType: [], price: {min: minPrice, max: maxPrice}, q: '' }
  const initialItems = { roastTypes: [{ label: 'Light Roast', value: 'light', isRefined: false}, { label: 'Medium Roast', value: 'medium', isRefined: false}, { label: 'Dark Roast', value: 'dark', isRefined: false}], priceRange: [minPrice, maxPrice] }

  const [filtering, setFiltering] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const [items, setItems] = useState(initialItems)
  const [query, setQuery] = useState('')

  const handleRoastChange = async (event) => {
    if (filters.roastType.includes(event.target.value)) {
      setFilters({...filters, roastType: filters.roastType.filter(f => f !== event.target.value)})
    }
    else {
      setFilters({...filters, roastType: filters.roastType.concat(event.target.value)})
    }
    setItems({...items, roastTypes: items.roastTypes.map(roast => roast.value === event.target.value ? {...roast, isRefined: !roast.isRefined } : roast)})
  }

  const handlePriceChange = async (newValue) => {
    setFilters({...filters, price: {min: newValue[0], max: newValue[1]}})
  }

  const handleSearchFilterChange = (val) => {
    setFilters({...filters, q: val})
  }

  // delays the actual api call for specified period of time to reduce calls
  const debounceSearch = useCallback(debounce(handleSearchFilterChange, debounceDuration), [])

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
    debounceSearch(event.target.value)
  }

  const clearFiltersAndRefinements = () => {
    setFilters(initialFilters)
    setItems(initialItems)
  }

  const handleSubmitButtonClick = async (event) => {
    event.preventDefault()
    if (!authContext.isLoggedIn) {
      setDialogOpen(true)
      return
    }
    history.push('/coffees/add')
  }

  return (
    <BrowseWrapper>
      <Seo title={'All Coffees'} />
      <OpenMobileFilters filtering={filtering} setFiltering={setFiltering} />
      <SubmitNewButtonDiv>
        <Button variant="outlined" onClick={handleSubmitButtonClick} size="small">Submit New</Button>
      </SubmitNewButtonDiv>
      <BrowseFiltersDiv>
        <TestDiv data-testid="browse:filters" filtering={filtering}>
          <BrowseFiltersHeaderDiv>
            <h2>Filters</h2>
            <ClearFilters minPrice={minPrice} maxPrice={maxPrice} filters={filters} clearFiltersAndRefinements={clearFiltersAndRefinements} />
          </BrowseFiltersHeaderDiv>
          {/* Insert current filters here later - will require restructuring */}
          <AlgoliaAllRefinementListsWrapper>
            <FilterList header={'Roast Type'} items={items.roastTypes} handleChange={handleRoastChange} />
            <PriceFilter items={items} minPrice={minPrice} maxPrice={maxPrice} setItems={setItems} header={'Price'} priceRange={items.priceRange} handlePriceChange={handlePriceChange} />
          </AlgoliaAllRefinementListsWrapper>
          <TestFooter filtering={filtering}>
            <ClearFiltersMobile clearFiltersAndRefinements={clearFiltersAndRefinements}/>
            <SaveFiltersMobile onClick={() => setFiltering(false)} />
          </TestFooter>
        </TestDiv>
      </BrowseFiltersDiv>

      <BrowseHitsDiv>
        <SearchBar query={query} handleSearchChange={handleSearchChange} />
        <Search filters={filters} filtering={filtering} />
      </BrowseHitsDiv>

      <Dialog title="Sign in to submit a new coffee" description={"Sign in or register with your email address"} open={dialogOpen} setOpen={setDialogOpen} />
    </BrowseWrapper>
  )
}

const ClearFilters = ({ clearFiltersAndRefinements, filters, minPrice, maxPrice }) => (
  <ClearRefinementsButton onClick={clearFiltersAndRefinements} disabled={filters.roastType.length === 0 && (filters.price.min === minPrice && filters.price.max === maxPrice)}>
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

const OpenMobileFilters = ({ filtering, setFiltering }) => (
  <Hidden mdUp>
    <TestButton filtering={filtering} onClick={() => setFiltering(!filtering)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14"><path d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z" stroke="#fff" strokeWidth="1.29" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      Show Filters
    </TestButton>
  </Hidden>
)

const ClearFiltersMobile = ({ clearFiltersAndRefinements }) => (
  <MobileFiltersButtonWrapper>
    <ClearRefinementsButtonMobile onClick={clearFiltersAndRefinements}>Reset Filters</ClearRefinementsButtonMobile>
  </MobileFiltersButtonWrapper>
)

const SaveFiltersMobile = ({ onClick }) => (
  <MobileFiltersButtonWrapper>
    <SaveFiltersButtonMobile onClick={onClick}>View coffees</SaveFiltersButtonMobile>
  </MobileFiltersButtonWrapper>
)

export default SearchPage