import styled from 'styled-components'

export const RoasterImageBox = styled.div`
  position: relative;
  width: ${props => props.width ? props.width : '4rem'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'none'};

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  img {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    object-fit: contain;
    object-position: center;
    max-height: 100%;
  }
`

export const Input = styled.input`
	display: block;
	margin: 5px auto 15px;
	padding: 10px;
	background: transparent;
	border: none;
	width: 100%;
	background: #f7f7f7;
	font-family: inherit;
	border: 1px solid #d9e7ea;
	border-radius: 4px;
	outline: none;

	&:focus {
		outline-color: #73777d;
	}
`