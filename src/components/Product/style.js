import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
	padding: 5em;

  @media (max-width: 960px) {
    padding: 2rem
  }

	@media (max-width: 600px) {
		padding: 0;
	}
`