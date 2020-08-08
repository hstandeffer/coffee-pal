import styled from 'styled-components'

export const TastingWrapper = styled.div`
  width: 100%;
	padding: 0 2.5em;

	@media (max-width: 600px) {
		padding: 0;
	}
`

export const TastingDiv = styled.div`
	padding: 0 2.5em;
	margin: 2.5em auto;
	text-align: center;
	background: #fff;
	border-radius: 4px;
	border: 1px solid #d9e7ea;

	@media (max-width: 600px) {
		padding: 24px 0;
		border-radius: 0;
	}
`