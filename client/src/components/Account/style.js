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

export const Wrapper = styled.div`
  width: 100%;
	padding: 24px;

	@media (max-width: 560px) {
		padding: 24px 0;
	}
`

export const StyledDiv = styled.div`
	max-width: 480px;
	padding: 24px;
	margin: 0px auto;
	text-align: center;
	background: #fff;
	border-radius: 4px;

	@media (max-width: 560px) {
		padding: 24px 0;
		border-radius: 0;
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