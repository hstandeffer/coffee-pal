import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectStats,
  connectRefinementList,
  ClearRefinements,
  connectCurrentRefinements,
} from 'react-instantsearch-dom';
import {
  FlexContainer,
  FlexProductDiv,
  ImageContainer,
  ImageContentContainer,
  InfoContainer
} from '../Search/style';

import { Wrapper } from '../../shared-style'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

import {
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
  AlgoliaStyledRefinementListCountSpan
} from './style'

const searchClient = algoliasearch(
  'BDTHKSA1TY',
  'd3b6a47c767eebf56ba2732462bf8875'
);

const Browse = () => {
  return (
    <Wrapper>
    <InstantSearch indexName="coffee" searchClient={searchClient} >
      <Grid container>
        <Grid item xs={12} md={2}>
          <ClearRefinements />
          <CustomCurrentRefinements transformItems={items =>
            items.map(item => {
              if (item.label === 'siteName: ') {
                item.label = 'Brand: '
              }
              return item
            })
          }/>
          <CustomRefinementList attribute="siteName" operator="or" />
        </Grid>
        <Grid item xs={12} md={10}>
          <CustomSearchBox />
          <CustomStats />
          <FlexContainer>
            <CustomHits hitComponent={Hit} />
          </FlexContainer>
        </Grid>
      </Grid>
    </InstantSearch>
  </Wrapper>
  )
}

const CustomCurrentRefinements = connectCurrentRefinements(({ items, refine }) => (
  <div>
    <AlgoliaStyledUl>
      {items.map(item => (
        <li key={item.label}>
          {item.items ? (
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
          )}
        </li>
      ))}
    </AlgoliaStyledUl>
  </div>
))

const CustomRefinementList = connectRefinementList(({ items, refine }) => (
  <div>
    <AlgoliaStyledUl>
      {items.map(item => (
          <AlgoliaStyledLi key={item.label}>
            <label>
              <input type="checkbox" onChange={() => refine(item.value)} checked={item.isRefined} />
              <AlgoliaStyledOuterRefinementListSpan>
                <span style={{fontWeight: item.isRefined ? '700' : ''}}>
                  {item.label}
                </span>
              </AlgoliaStyledOuterRefinementListSpan>
              <AlgoliaStyledRefinementListCountSpan>
                {item.count}
              </AlgoliaStyledRefinementListCountSpan>
            </label>
          </AlgoliaStyledLi> 
      ))}
    </AlgoliaStyledUl>
  </div>
))

const CustomStats = connectStats(({ processingTimeMS, nbHits }) => (
  <AlgoliaStyledStats>{nbHits} results found in {processingTimeMS} ms</AlgoliaStyledStats>
))

const CustomHits = connectHits(({ hits }) => {
  return (
    hits.map(hit => (
        <Hit hit={hit} key={hit.objectID} />
    ))
  )
})

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

// const CustomSearchBox = connectSearchBox(SearchBox);

const CustomSearchBox = connectSearchBox(({ currentRefinement, isSearchStalled, refine }) => {
  const [val, setVal] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    refine(val)
  }
  
  if (isSearchStalled) {
    return <h3>Search is loading...</h3>
  }

  return (
    <AlgoliaSearchBarDiv>
      <AlgoliaSearchBarForm onSubmit={handleSubmit} noValidate action="" role="search">
        <AlgoliaSearchBarSubmitButton type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a97fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </AlgoliaSearchBarSubmitButton>
        <AlgoliaSearchBarInput
          type="search"
          value={val}
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
})

export default Browse