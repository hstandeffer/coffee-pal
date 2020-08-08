import React from 'react'
import styled from 'styled-components'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import StyledSignOutButton from '../SignOut'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
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

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`

const nonAuthRoutes = [
  {
    route: ROUTES.SIGN_IN,
    text: 'Login'
  },
  {
    route: ROUTES.SIGN_UP,
    text: 'Sign Up'
  }
]

const authRoutes = [
  {
    route: ROUTES.BROWSE,
    text: 'Browse'
  },
  {
    route: ROUTES.PROFILE,
    text: 'Profile'
  },
  {
    route: ROUTES.ACCOUNT,
    text: 'Account'
  }
]

const RightNav = ({ open, authUser, onClick }) => {
  const routeList = authUser ? authRoutes : nonAuthRoutes
  return (
    <Ul open={open}>
      {routeList.map((obj) => (
        <li key={obj.text}>
          <StyledLink onClick={onClick} to={obj.route}>{obj.text}</StyledLink>
        </li>
      ))}
      {authUser ? <li><StyledSignOutButton /></li> : null}
    </Ul>
  )
}

export default RightNav