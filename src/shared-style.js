import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const StyledH1 = styled.h1`
	margin-top: 0;
`

export const Wrapper = styled.div`
  width: 100%;
	padding: 2.5em;

	@media (max-width: 560px) {
		padding: 0;
	}
`

export const StyledDiv = styled.div`
	max-width: ${({ maxWidth }) => maxWidth ? maxWidth : '480px' };
	padding: 2.5em;
	margin: 0px auto;
	text-align: center;
	background: #fff;
	border-radius: 4px;
	border: 1px solid #d9e7ea;

	@media (max-width: 560px) {
		padding: 24px 0;
		border-radius: 0;
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

export const StyledButton = styled.button`
	font-size: 20px;
	margin-top: 10px;
	padding: 0.5em 1em;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	width: 90%;
	background: #28445b;
	color: #fff;

	&:disabled {
		opacity: 0.75
	}
`

export const StyledLink = styled(Link)`
    text-decoration: none;
`