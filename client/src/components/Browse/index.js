import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectStats,
  connectRefinementList,
  connectCurrentRefinements,
} from 'react-instantsearch-dom';
import {
  FlexProductDiv,
  ImageContainer,
  ImageContentContainer,
  InfoContainer
} from '../Search/style';
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
} from './style'

import { withAuthorization } from '../Session';

const searchClient = algoliasearch(
  'BDTHKSA1TY',
  'd3b6a47c767eebf56ba2732462bf8875'
);

const Browse = () => {
  const [filtering, setFiltering] = useState(false) 
  return (
    <BrowseWrapper>
      <InstantSearch indexName="coffee" searchClient={searchClient}>
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
                <CustomClearRefinements />
              </BrowseFiltersHeaderDiv>
              <CustomCurrentRefinements transformItems={items =>
                items.map(item => {
                  if (item.label === 'siteName: ') {
                    item.label = 'Brand: '
                  }
                  return item
                })
              }/>
              <AlgoliaAllRefinementListsWrapper>
                <CustomRefinementList header="Brand" attribute="siteName" operator="or" />
                <CustomRefinementList header="Roast Type" attribute="roastType" operator="or" />
              </AlgoliaAllRefinementListsWrapper>
              <TestFooter filtering={filtering}>
                <CustomClearRefinementsMobile />
                <SaveFiltersMobile onClick={() => setFiltering(false)} />
              </TestFooter>
            </TestDiv>
          </BrowseFiltersDiv>

          <BrowseHitsDiv>
            <CustomSearchBox />
            <CustomStats />
            <FlexContainer filtering={filtering}>
              <CustomHits hitComponent={Hit} />
            </FlexContainer>
          </BrowseHitsDiv>
      </InstantSearch>
    </BrowseWrapper>
  )
}

const CustomClearRefinements = connectCurrentRefinements(({ items, refine }) => {
  return (
    <ClearRefinementsButton onClick={() => refine(items)} disabled={!items.length}>
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
})

const CustomClearRefinementsMobile = connectCurrentRefinements(({ items, refine }) => {
  return (
    <MobileFiltersButtonWrapper>
      <ClearRefinementsButtonMobile onClick={() => refine(items)}>Reset Filters</ClearRefinementsButtonMobile>
    </MobileFiltersButtonWrapper>
  )
})

const SaveFiltersMobile = connectStats(({ nbHits, onClick }) => (
  <MobileFiltersButtonWrapper>
    <SaveFiltersButtonMobile onClick={onClick}>
      View {nbHits} coffees
    </SaveFiltersButtonMobile>
  </MobileFiltersButtonWrapper>
))

const CustomCurrentRefinements = connectCurrentRefinements(({ items, refine }) => (
  <div>
    <AlgoliaStyledUl current={true}>
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

const CustomRefinementList = connectRefinementList(({ header, items, refine }) => (
  <AlgoliaRefinementListWrapper>
    <AlgoliaRefinementHeader>
      {header}
    </AlgoliaRefinementHeader>
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
  </AlgoliaRefinementListWrapper>
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
    <ProductLink to={`/coffee/${hit.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}/${hit.objectID}`}>
      <ImageContainer>
        <ImageContentContainer>
          {/* <img onError={(e) => e.target.src = "https://freepikpsd.com/wp-content/uploads/2019/10/coffee-bag-png-7-Transparent-Images.png"} src={hit.imageUrl} alt={hit.title} /> */}
        </ImageContentContainer>
      </ImageContainer>
      <InfoContainer>
        <div style={{height: '40px', overflow: 'hidden', fontWeight: 'bold'}}>{hit.title}</div>
        <div style={{margin: '5px 0'}}>${hit.price}</div>
        {hit.roastType && <div style={{margin: '5px 0', textTransform: 'capitalize'}}>{`${hit.roastType} roast`}</div>}
      </InfoContainer>
    </ProductLink>
  </FlexProductDiv>
)

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

const condition = authUser => !!authUser

export default withAuthorization(condition)(Browse)