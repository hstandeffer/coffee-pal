import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';
import {
  FlexContainer,
  FlexProductDiv,
  ItemsDiv,
  ImageContainer,
  ImageContentContainer,
  InfoContainer
} from '../Search/style';

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

import {
  AlgoliaSearchBarDiv,
  AlgoliaSearchBarForm,
  AlgoliaSearchBarInput,
  AlgoliaSearchBarSubmitButton,
  AlgoliaPoweredByImage,
  AlgoliaPoweredByLink
} from './style'

const searchClient = algoliasearch(
  'BDTHKSA1TY',
  'd3b6a47c767eebf56ba2732462bf8875'
);

const Browse = () => (
  <InstantSearch indexName="coffee" searchClient={searchClient} >
    <CustomSearchBox />
    <>
      <Grid container direction="row" justify="center">
        <Grid item xs={12}>
          <ItemsDiv style={{margin: '0 10%'}}>
            <FlexContainer>
              <CustomHits hitComponent={Hit} />
            </FlexContainer>
          </ItemsDiv>
        </Grid>
      </Grid>
    </>
  </InstantSearch>
);

const Hits = ({ hits }) => (
  hits.map(hit => (
    <Hit hit={hit} key={hit.objectID} />
  ))
)

const CustomHits = connectHits(Hits);

const Hit = ({ hit }) => (
  <FlexProductDiv>
    <ImageContainer>
      <ImageContentContainer>
        <img src={hit.imageUrl} alt={hit.title} />
      </ImageContentContainer>
    </ImageContainer>
    <InfoContainer>
      <div style={{height: '40px', overflow: 'hidden', fontWeight: 'bold'}}>{hit.title}</div>
      <div style={{margin: '5px 0'}}>${hit.price}</div>
      <div style={{margin: '5px 0', textTransform: 'capitalize'}}>{hit.roastType} roast</div>
      <div>
        {/* <button onClick={() => onFavoriteClick(hit.uid)}>Favorite</button> */}
      </div>
    </InfoContainer>
  </FlexProductDiv>
)

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const [val, setVal] = useState('')

  const onSubmit = (event) => {
    event.preventDefault();
    refine(val)
  }

  return (
    <AlgoliaSearchBarDiv>
      {/* {isSearchStalled ? 'Search is loading...' : ''} */}
      <AlgoliaSearchBarForm onSubmit={onSubmit} noValidate action="" role="search">
        <AlgoliaSearchBarSubmitButton type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a97fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </AlgoliaSearchBarSubmitButton>
        <AlgoliaSearchBarInput
          type="search"
          value={val}
          searchAsYouType={false}
          onChange={({ target }) => setVal(target.value)}
          placeholder="Search for coffees..."
        />
        <Hidden smUp>
          <AlgoliaPoweredByLink href="https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=localhost&utm_campaign=poweredby">
            <AlgoliaPoweredByImage src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1595410010/Algolia_com_Website_assets/images/shared/algolia_logo/algolia-blue-mark.svg" />
          </AlgoliaPoweredByLink>
        </Hidden>
        <Hidden xsDown>
          <AlgoliaPoweredByLink href="https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=localhost&utm_campaign=poweredby">
            <AlgoliaPoweredByImage src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1595410010/Algolia_com_Website_assets/images/search/search-by-algolia.svg" />
          </AlgoliaPoweredByLink>
        </Hidden>
      </AlgoliaSearchBarForm>
    </AlgoliaSearchBarDiv>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default Browse