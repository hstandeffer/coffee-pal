import styled from 'styled-components';
// these are the exact same from sign out.. what better way to organize and reduce repetitiveness?

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

export const StyledDiv = styled.div`
    width: 450px;
    padding: 24px;
    margin: 30px auto;
    text-align: center;
    background: white;
`

export const StyledButton = styled.button`
    font-size: 20px;
    margin-top: 10px;
    padding: 0.25em 1em;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 30%;
`