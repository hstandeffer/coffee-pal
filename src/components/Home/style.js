import styled from 'styled-components';

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

export const CheckInput = styled.input`
  display: inline-block;
  margin: 10px;
  padding: 10px;
  height: 16px;
  width: 16px;
`

export const CheckLabel = styled.label`
  font-size: 20px;
`

export const StyledDiv = styled.div`
    width: 450px;
    padding: 24px;
    margin: 30px auto;
    text-align: center;
    background: white;
`

export const StyledButton = styled.button`
    display: block;
    font-size: 20px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0.25em 1em;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`