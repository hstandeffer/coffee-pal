import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ProductLink = styled(Link)`
  text-decoration: none;
  outline: none;
  color: black;
`

export const BrowseWrapper = styled.div`
  width: 100%;
	padding: 2.5em;
  display: flex;

	@media (max-width: 600px) {
		padding: 0;
	}

  @media (max-width: 960px) {
    display: block;
  }
`

export const BrowseFiltersDiv = styled.div`
  flex: 1;
  max-width: 260px;
  margin-right: 50px;
`

export const BrowseHitsDiv = styled.div`
  flex: 3;
`

export const TestDiv = styled.div`
  max-width: 260px;
  flex: 1;
  position: sticky;
  top: 25px;
  
  @media(max-width: 960px) {
    background: #fff;
    border-radius: 16px;
    top: 0;
    left: 0;
    max-width: initial;
    padding-bottom: 4rem;
    position: ${props => props.filtering ? 'absolute' : 'fixed'};
    transform: ${props => props.filtering ? 'translateY(65px)' : 'translateY(120vh)'};
    transition: transform 300ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    width: 100%;
    will-change: transform;
    z-index: 20;
  }
`

export const TestFooter = styled.footer`
  display: none;
  @media(max-width:960px) {
    background-color: #fff;
    border-top: 1px solid #ebecf3;
    bottom: 0;
    display: ${props => props.filtering ? 'flex' : 'none'};
    justify-content: space-between;
    padding: 1rem;
    position: fixed;
    width: 100%;
    z-index: 5;
  }
`

export const TestButton = styled.button`
  display: none;
  @media(max-width: 960px) {
    align-items: center;
    background-color: #008fe2;
    border: none;
    border-radius: 8px;
    bottom: 2rem;
    box-shadow: 0 4px 22px 0 rgb(0 0 0 / 40%);
    color: #fff;
    cursor: pointer;
    display: ${props => props.filtering ? 'none': 'flex'};
    font: inherit;
    font-size: 0.875rem;
    font-weight: bold;
    justify-content: center;
    left: 50%;
    min-height: 40px;
    min-width: 112px;
    position: fixed;
    transform: translateX(-50%);
    z-index: 10;

    svg {
      height: 14px;
      margin-right: 8px;
      width: 16px;
    }
  }
`

export const MobileFiltersButtonWrapper = styled.div`
  @media(max-width: 960px) {
    width: calc(50% - 0.5rem);
  }
`

export const SaveFiltersButtonMobile = styled.button`
  @media(max-width: 960px) {
    background-color: #008fe2;
    color: #fff;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    font: inherit;
    font-size: 0.75rem;
    font-weight: bold;
    justify-content: center;
    padding: 12px;
    text-align: center;
    width: 100%;
  }
`

export const BrowseFiltersHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 1.5rem;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #626262;
  }

  @media(max-width: 960px) {
    margin: 20px 2rem;
  }
`

export const ClearRefinementsButton = styled.button`
  padding: 0;
  overflow: visible;
  font: inherit;
  line-height: normal;
  color: rgba(33, 36, 61, 0.7);
  background: none;
  border: 0;
  cursor: pointer;
  user-select: none;
  font-size: .88rem;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: rgba(33, 36, 61, 0.5);
    cursor: not-allowed;
  }

  svg {
    margin-right: 8px;
  }

  @media(max-width: 960px) {
    display: none;
  }
`

export const ClearRefinementsButtonMobile = styled.button`
  @media(max-width: 960px) {
    background-color: rgba(65, 66, 71, 0.16);
    border: none;
    border-radius: 8px;
    color: rgba(33, 36, 61, 0.7);
    cursor: pointer;
    display: flex;
    font: inherit;
    font-size: 0.75rem;
    font-weight: bold;
    justify-content: center;
    padding: 12px;
    text-align: center;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`

export const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  &:after {
    content: "";
    margin-left: 22%;

    @media(max-width: 600px) {
      marign-left: 47%;
    }

    @media(max-width: 960px) {
      margin-left: 30%;
    }
  }
  
  @media (max-width: 600px) {
    margin: 0 3.5%;
  }

  @media(max-width: 960px) {
    display: ${props => props.filtering ? 'none' : 'flex'};
  }
`

export const AlgoliaRefinementHeader = styled.div`
  border: none;
  color: #21243d;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08rem;
  line-height: 1.6;
  padding-bottom: 1rem;
  text-transform: uppercase;
`

export const AlgoliaAllRefinementListsWrapper = styled.div`
  @media(max-width: 960px) {
    padding: 2rem 2rem 0 2rem;
  }
`

export const AlgoliaRefinementListWrapper = styled.div`
  border-top: 1px solid #ebecf3;
  padding-bottom: 2rem;
  padding-top: 2rem;
`

export const AlgoliaSearchBarDiv = styled.div`
  height: 50px;
  border-radius: 4px;
  background: #f5f5fa;
  margin: 0 1.5% 15px;
  
  @media(max-width: 960px) {
    margin: 0 calc(5%/3) 15px;
  }

  @media(max-width: 600px) {
    margin: 10px 5%;
  }
`

export const AlgoliaSearchBarForm = styled.form`
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 16px;

`

export const AlgoliaSearchBarInput = styled.input`
  height: 50px;
  border: none;
  background: transparent;
  padding: 0 10px;
  outline: none;
  font-size: 16px;
  flex-grow: 1;
`

export const AlgoliaSearchBarSubmitButton = styled.button`
  border: none;
  background: transparent;
  outline: none;

  @media(max-width: 600px) {
    padding: 0;
  }
`

export const AlgoliaSearchBarResetButton = styled.button`
  background: transparent;
  border: none;
`

export const AlgoliaPoweredByImage = styled.img`
  margin-left: 10px;
  height: 16px;
`

export const AlgoliaPoweredByLink = styled.a`
  height: 16px;
`

export const AlgoliaStyledStats = styled.p`
  margin: 5px 1.5%;
  text-align: right;
  font-size: 13px;
  color: grey;
  
  @media(max-width: 960px) {
    margin: 5px calc(5%/3);
  }

  @media(max-width: 600px) {
    margin: 5px 5%;
  }
`

export const AlgoliaStyledUl = styled.ul`
  display: flex;
  flex-flow: ${props => props.current ? 'row nowrap' : 'column nowrap'};
  list-style: none;
  padding: 0;
  margin: 10px 0;

  @media(max-width: 960px) {
    margin: 0 2rem;
  }
`

export const AlgoliaStyledCurrentRefinementOuterSpan = styled.span`
  display: block;
  margin: 2px;
  padding: 4px 8px;
  background-color: #24676d;
  font-size: 13px;
  color: #fff;
  border-radius: 4px;

  button {
    color: #fff;
    opacity: .8;
    background: transparent;
    padding: 0;
    cursor: pointer;
    border: 0;
  }
`

export const AlgoliaStyledLi = styled.li`
  margin-bottom: 8px;

  label {
    cursor: pointer;
  }
`

export const AlgoliaStyledOuterRefinementListSpan = styled.span`
  margin-left: 8px;
  cursor: pointer;
`

export const AlgoliaStyledRefinementListCountSpan = styled.span`
  display: inline-block;
  background-color: rgba(197,201,224,.2);
  color: #848ab8;
  border-radius: 4px;
  margin-left: 8px;
  padding: 2px 4px;
  font-size: 10px;
  letter-spacing: 1.3px;
`
