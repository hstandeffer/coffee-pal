import styled from 'styled-components'
import { TextField } from '@material-ui/core'

export const BoldLabel = styled.label`
	font-weight: bold;
`

export const StyledInput = styled.input`
	display: block;
	margin: 5px auto 15px;
	padding: 10px;
	background: transparent;
	border: none;
	width: 100%;
	background: #f7f7f7;
	font-size: 16px;
	font-family: inherit;
	border: 1px solid rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	outline: none;

	&:focus {
		border-bottom-color: #3F51B5;
    box-shadow: 0 1px 0 0 #3F51B5
	}

	&:hover {
		border: 1px solid black;
	}
`

export const StyledTextField = styled(TextField)`
	display: block;
	margin: 5px auto 15px;
	padding: 10px;
	background: transparent;
	border: none;
	width: 100%;
	background: #f7f7f7;
	font-family: inherit;
	border: 1px solid rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	outline: none;

	&:focus {
		outline-color: #73777d;
	}
`