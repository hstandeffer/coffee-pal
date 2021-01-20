import styled from 'styled-components'

export const SidebarDiv = styled.div`
  flex: 1;
  max-width: 200px;
  border-right: 1px solid #dfdfdf;

  @media (max-width: 960px) {
    display: none;
  }
`

export const MainContentDiv = styled.div`
  flex: 3;
`

export const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  border-radius: 1rem;

	@media (max-width: 600px) {
		padding: 0;
	}

  @media (max-width: 960px) {
    display: block;
  }
`

export const TestDiv = styled.div`
  max-width: 260px;
  flex: 1;
  position: sticky;
  top: 25px;
  
  @media(max-width: 960px) {
    background: #fff;
    border-radius: 16px;
    top: 0;
    left: 0;
    max-width: initial;
    padding-bottom: 4rem;
    position: ${props => props.filtering ? 'absolute' : 'fixed'};
    transform: ${props => props.filtering ? 'translateY(65px)' : 'translateY(120vh)'};
    transition: transform 300ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    width: 100%;
    will-change: transform;
    z-index: 20;
  }
`

export const AvatarImageContainer = styled.div`
  position: relative;
  width: 100%;

  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: 100%;
  }

  &:after {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    content: " ";
    background-color: none;
	}
`