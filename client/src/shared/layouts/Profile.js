import React, { useState, useEffect } from 'react'
import { Box, Button, Link, Hidden, Container, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import userService from '../../services/user'
import { SidebarDiv, MainContentDiv, ProfileWrapper } from '../../components/Profile/style'
import { TestDiv } from '../../components/Browse/style'
import ProfileDrawer from '../components/ProfileDrawer'
import FullPageSpinner from '../components/Spinner'

const ProfileLinks = () => (
  <>
    <Link component={RouterLink} underline="none" to="/profile">
      <Button  style={{ paddingTop: '20px', paddingBottom: '20px' }} fullWidth size="large">Profile</Button>
    </Link>
    <Link component={RouterLink} underline="none" to="/profile/account">
      <Button style={{ paddingTop: '20px', paddingBottom: '20px' }} fullWidth size="large">Account</Button>
    </Link>
    <Link component={RouterLink} underline="none" to="/profile/saved">
      <Button style={{ paddingTop: '20px', paddingBottom: '20px' }} fullWidth size="large">Saved Coffees</Button>
    </Link>
  </>
)

const ProfilePage = ({ children, heading }) => {
  const [coffees, setCoffees] = useState([])
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    userService.getCurrentUser().then(currentUser => {
      setUser(currentUser)
      setCoffees(currentUser.saved_coffees)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <FullPageSpinner size={50} />
  }

  const handleRemove = async (coffeeId) => {
    setCoffees(coffees.filter(coffee => coffee.id !== coffeeId ))
    await userService.deleteCoffee(coffeeId)
  }

  return (
    <Box pb={"5rem"} bgcolor="rgb(242 242 242)">
      <Container maxWidth="md">
        <Box py={4}>
          <Hidden mdUp>
            <ProfileDrawer profileLinks={<ProfileLinks />} direction='left'/>
          </Hidden>
          <Typography align="center" component="h2" variant="h4">Your Settings</Typography>
        </Box>
        <ProfileWrapper>
          <SidebarDiv>
            <TestDiv style={{ position: 'inherit' }}>
            <Box py={3} width="100%">
                <ProfileLinks />
              </Box>
            </TestDiv> 
          </SidebarDiv>
          <MainContentDiv>
            <Box pt={3} pb={5}>
            <Box mb={2}>
              <Typography align='center' variant="h5" component="h2">{heading}</Typography>
            </Box>
              {React.cloneElement(children, { coffees: coffees, user: user, handleRemove: handleRemove })}
            </Box>
          </MainContentDiv>
        </ProfileWrapper>
      </Container>
    </Box>
  )
}

export default ProfilePage