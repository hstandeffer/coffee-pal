import React, { useState, useEffect } from 'react'
import { Box, Button, Link, Hidden } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import userService from '../../services/user'
import { SidebarDiv, MainContentDiv, ProfileWrapper } from '../../components/Profile/style'
import { TestDiv } from '../../components/Browse/style'
import ProfileDrawer from '../components/ProfileDrawer'
import FullPageSpinner from '../components/Spinner'

const ProfileLinks = () => (
  <>
    <Link component={RouterLink} underline="none" to="/profile">
      <Button style={{ paddingTop: '20px', paddingBottom: '20px' }} fullWidth size="large">Profile</Button>
    </Link>
    <Link component={RouterLink} underline="none" to="/profile/account">
      <Button style={{ paddingTop: '20px', paddingBottom: '20px' }} fullWidth size="large">Account</Button>
    </Link>
    <Link component={RouterLink} underline="none" to="/profile/saved">
      <Button style={{ paddingTop: '20px', paddingBottom: '20px' }} fullWidth size="large">Saved Coffees</Button>
    </Link>
  </>
)

const ProfilePage = ({ children }) => {
  const [coffees, setCoffees] = useState([])
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    userService.getCurrentUser().then(currentUser => {
      if (isMounted) {
        setUser(currentUser)
        setCoffees(currentUser.saved_coffees)
        setLoading(false)
      }
    })
    return () => { isMounted = false }
  }, [])

  if (loading) {
    return <FullPageSpinner size={50} />
  }

  return (
    <ProfileWrapper>
      <Hidden mdUp>
        <ProfileDrawer profileLinks={<ProfileLinks />} direction='left'/>
      </Hidden>
      <SidebarDiv>
        <TestDiv style={{ position: 'inherit' }}>
          <Box py={5} width="100%">
            <ProfileLinks />
          </Box>
        </TestDiv> 
      </SidebarDiv>
      <MainContentDiv>
        <Box py={5} mx="2rem" mb="3rem">
          {React.cloneElement(children, { coffees: coffees, user: user})}
        </Box>
      </MainContentDiv>
    </ProfileWrapper>
  )
}

export default ProfilePage