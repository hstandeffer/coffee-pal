import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 680px;
  padding: 0px 24px;
  margin: 30px auto;
  text-align: center;
  background: white;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Input = styled.input`
  display: block;
  margin: 10px auto;
  padding: 10px;
  background: transparent;
  border: none;
  width: 90%;
  background: #f7f7f7;
  font-family: inherit;
  font-size: 20px;

  &:focus {
    outline-color: #73777d;
  }
`

export const CenteredDiv = styled.div`
  margin: 0 auto;
`

export const StyledCoffeeItemDiv = styled.div`
  margin: 8px auto;
  padding: 8px;
  width: 90%;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`