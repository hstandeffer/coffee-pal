import React, { useContext } from 'react'
import styled from 'styled-components'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import { SignOutButton } from '../SignOut'
import AuthUserContext from '../Session/context'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ open }) => open ? '#4A4A4A' : '#383838' };
  font-weight: 600;
`

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  z-index: 19; 
  /* look into the account buttons overlapping if above line is removed */

  li {
    padding: 18px 10px;
  }

  @media (max-width: 960px) {
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    padding-top: 3.5rem;
    padding-left: 0;
    text-align: center;
    font-size: 20px;
    transition: transform 0.3s ease-in-out;
  }
`

const nonAuthRoutes = [
  {
    route: ROUTES.BROWSE,
    text: 'Coffees'
  },
  {
    route: ROUTES.ROASTERS,
    text: 'Roasters'
  },
  {
    route: ROUTES.SIGN_IN,
    text: 'Sign in'
  },
]

const authRoutes = [
  {
    route: ROUTES.BROWSE,
    text: 'Coffees'
  },
  {
    route: ROUTES.ROASTERS,
    text: 'Roasters'
  },
  {
    route: ROUTES.PROFILE,
    text: 'Profile'
  },
]

const RightNav = ({ open, closeMenu }) => {
  const authContext = useContext(AuthUserContext)
  const routeList = authContext.isLoggedIn ? authRoutes : nonAuthRoutes
  return (
    <Ul open={open}>
      {routeList.map((obj) => (
        <li key={obj.text}>
          <StyledLink open={open} onClick={closeMenu} to={obj.route}>{obj.text}</StyledLink>
        </li>
      ))}
      {authContext.isLoggedIn ? <li><SignOutButton open={open} closeMenu={closeMenu} /></li> : null}
    </Ul>
  )
}

export default RightNav