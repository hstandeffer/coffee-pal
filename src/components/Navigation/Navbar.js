import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const Nav = styled.nav`
  width: 100%;
  height: 65px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 0;
  }
`

const Navbar = ({ authUser }) => {
  return (
    <Nav>
      <div className="logo">
        <StyledLink to={ROUTES.LANDING}>Coffee Pal</StyledLink>
      </div>
      <Burger authUser={authUser} />
    </Nav>
  )
}

export default Navbar