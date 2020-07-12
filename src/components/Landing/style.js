import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  /* background: #28445b; */
`

export const StyledDiv = styled.div`
  width: 100%;
  padding: 24px;
  margin: 0px auto;
  text-align: center;
  color: #fff;
`

export const StyledH1 = styled.h1`
  margin: 0;
`

export const StyledButton = styled.button`
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
