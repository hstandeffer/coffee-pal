import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #36414a;
  font-weight: 600;
  color: #fff;
`

const Nav = styled.nav`
  width: 100%;
  height: 65px;
  padding: 0 2.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #275e71;

  .logo {
    padding: 15px 0;
    color: #fff;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        <StyledLink to={ROUTES.LANDING}>
          baroasta
        </StyledLink>
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar