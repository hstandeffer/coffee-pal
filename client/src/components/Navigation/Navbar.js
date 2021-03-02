import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import { Box } from '@material-ui/core';

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #383838;
`

const Nav = styled.nav`
  width: 100%;
  height: 65px;
  padding: 0 2.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgb(236, 239, 241);

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <Box py="15px" px="0" color="#4e4e4e" fontSize="1.5rem">
        <StyledLink to={ROUTES.LANDING}>
          baroasta
        </StyledLink>
      </Box>
      <Burger />
    </Nav>
  )
}

export default Navbar