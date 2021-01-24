import styled from 'styled-components'

export const ProductGridDiv = styled.div`
  padding: 0 5em;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  @media (max-width: 600px) {
    padding: 24px 0;
    border-radius: 0;
  }

  @media (max-width: 960px) {
    padding: 0 1em;
  }
`

export const ProductWrapper = styled.div`
  width: 100%;
	padding: 1em;
  display: flex;

	@media (max-width: 600px) {
		padding: 0;
	}

  @media (max-width: 960px) {
    display: block;
  }
`

export const LineClampSummary = styled.div`
  text-align: left;
  color: darkslategrey;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`