import styled from 'styled-components'

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
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
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
