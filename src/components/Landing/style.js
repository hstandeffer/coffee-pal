import styled from 'styled-components'

export const LandingBanner = styled.div`
  width: 100%;
  margin: 50px auto;
  text-align: center;
  color: #fff;
`

export const FullWidthWrapper = styled.div`
  width: 100%;
`

export const FullWidthDiv = styled.div`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor ? bgColor : '#fff'};
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
