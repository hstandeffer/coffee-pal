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