import styled from 'styled-components';

export const FiltersWrapper = styled.div`
  
  @media(max-width: 961px) {
    width: 250px;
    padding: 1em 2.5em;
  }
`

export const FiltersDiv = styled.div`
	padding: 24px;
  margin: 0 10px;
	text-align: center;
	background: #fff;
	border-radius: 4px;
`

export const StyledH2 = styled.h2`
  margin-top: 0;
`

export const ItemsDiv = styled.div`
	background: #fff;
  border-radius: 4px;
  text-align: center;

  @media (max-width: 600px) {
    margin: 0 auto;
    border-radius: 0px;
  }
`

export const StyledCoffeeItemDiv = styled.div`
  margin: 8px auto;
  padding: 8px;
  width: 90%;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`

export const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  &:after {
    content: "";
    margin-left: 22%;

    @media(max-width: 600px) {
      marign-left: 47%;
    }

    @media(max-width: 960px) {
      margin-left: 30%;
    }
  }
  
  @media (max-width: 600px) {
    margin: 0 3.5%;
  }
`

export const FlexProductDiv = styled.div`
  text-align: center;
  flex: 0 0 22%;
  margin: 2% 1.5%;
  flex-flow: column;  
  box-shadow: 1px 0px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);

  @media (max-width: 960px) {
    flex: 0 0 30%;
    margin: 2% calc(5%/3);
  }
  
  @media (max-width: 600px) {
    flex: 0 0 47%;
    margin: 2% 1.5%;
  }
`

export const ImageContainer = styled.div`
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

export const ImageContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  img {
    width: 100%;
    position: relative;
    top: 50%;
    height: 100%;
    object-fit: cover;
    transform: translateY(-50%);
  }
`

export const InfoContainer = styled.div`
  width: 100%;
  padding: 10px;
`

export const Image = styled.img`
  width: 100%;
`

export const ProductInfoDiv = styled.div`
  margin-top: auto;
	padding-top: 20px;
`