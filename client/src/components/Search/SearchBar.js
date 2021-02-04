import React from 'react'
import { AlgoliaSearchBarDiv, AlgoliaSearchBarForm, AlgoliaSearchBarSubmitButton, AlgoliaSearchBarInput } from '../Browse/style'

const SearchBar = ({ query, setQuery, handleSearchSubmit, handleSearchChange }) => (
  <AlgoliaSearchBarDiv>
    <AlgoliaSearchBarForm onSubmit={handleSearchSubmit} noValidate action="" role="search">
      <AlgoliaSearchBarSubmitButton type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a97fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </AlgoliaSearchBarSubmitButton>
      <AlgoliaSearchBarInput
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for coffees..."
      />
    </AlgoliaSearchBarForm>
  </AlgoliaSearchBarDiv>
)

export default SearchBar