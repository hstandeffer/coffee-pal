import styled from 'styled-components'

export const LandingBanner = styled.div`
  width: 100%;
  padding: 5em 1em;
  text-align: center;
  color: #36414a;

  @media (max-width: 600px) {
    padding: 5em 30px;
  }
`

export const FullWidthWrapper = styled.div`
  width: 100%;
`

export const FullWidthDiv = styled.div`
  width: 100%;
  background-color: '#fff';
`

export const FeaturesWrapper = styled.div`
  padding: 5em 15em 10em;
  text-align: center;
  background: linear-gradient(287deg, #2795c7, #38b4c3);

  @media (max-width: 960px) {
    padding: 5em 5em 10em
  }

  @media (max-width: 600px) {
    padding: 5em 1.5em 10em;
  }
`

// export const FeaturesDiv = styled.div`
//   padding: 
// `

export const FeaturesHeader = styled.h2`
  color: #fff;
`

export const StyledH1 = styled.h1`
  margin: 0;
`

export const GetStartedButton = styled.button`
  font-size: 20px;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background: #0a8c5d; 

  &:focus {
    outline: none;
  }

  &:hover {
    background: #0d7f56;
  }
`
