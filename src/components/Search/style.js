import styled from 'styled-components';

export const StyledCoffeeItemDiv = styled.div`
  margin: 8px auto;
  padding: 8px;
  width: 90%;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`

export const FlexDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  
  @media (max-width: 560px) {
    margin: 0 2%;
  }
`;

export const FlexProductDiv = styled.div`
  text-align: left;
  margin: 2%;
  flex: 0 0 21%;

  @media (max-width: 560px) {
    flex: 0 0 29%;
  }
`;

export const Image = styled.img`
  width: 100%;
`;