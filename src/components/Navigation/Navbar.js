import React from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import {ReactComponent as ReactLogo} from '../../logo.svg'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`

const Nav = styled.nav`
  width: 100%;
  height: 65px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    padding: 15px 0;
  }
`

const Navbar = ({ authUser }) => {
  return (
    <Nav>
      <div className="logo">
        <StyledLink to={ROUTES.LANDING}>
          <ReactLogo width="150px" height="41px" />
        </StyledLink>
      </div>
      <Burger authUser={authUser} />
    </Nav>
  )
}

export default Navbar