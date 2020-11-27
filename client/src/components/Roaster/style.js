import styled from 'styled-components'

export const RoasterImageBox = styled.div`
  position: relative;
  width: 100%;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`