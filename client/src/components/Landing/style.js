import styled from 'styled-components'

export const LandingBanner = styled.div`
  width: 100%;
  padding: 2.5em 1em 5em;
  text-align: center;
  color: white;
  background: #275e71;

  @media (max-width: 600px) {
    padding: 5em 30px;
  }
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
