import styled from 'styled-components';

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
  padding: 24px;
  margin: 0 10px;
	text-align: center;
	background: #fff;
	border-radius: 4px; 

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
  
  @media (max-width: 600px) {
    margin: 0 2%;
  }
`

export const FlexProductDiv = styled.div`
  text-align: left;
  margin: 2%;
  flex: 0 0 21%;
  flex-flow: column;

  @media (max-width: 960px) {
    flex: 0 0 29%;
  }
  
  @media (max-width: 600px) {
    flex: 0 0 46%;
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
    background-color: rgba(0,0,0,0.03)
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
    transform: translateY(-50%);
  }
`

export const InfoContainer = styled.div`
  width: 100%;
`

export const Image = styled.img`
  width: 100%;
`

export const ProductInfoDiv = styled.div`
  margin-top: auto;
	padding-top: 20px;
`