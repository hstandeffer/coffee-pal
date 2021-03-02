import styled from 'styled-components'

export const LandingBanner = styled.div`
  width: 100%;
  padding: 7.5em 1em;
  text-align: center;
  color: black;
  background: linear-gradient(308deg,rgba(127,150,195,1) 0%,rgb(97 179 194 / 39%) 41%,rgba(5,88,138,0.3592787456779587) 100%)
`

export const StyledButton = styled.button`
  font-size: 20px;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.color ? props.color : '#fff'};
  background: #0a8c5d; 

  &:focus {
    outline: none;
  }

  &:hover {
    background: #0d7f56;
  }
`
