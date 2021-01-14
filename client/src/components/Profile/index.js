import React from 'react'
import dayjs from 'dayjs'
import { Box, Typography, makeStyles } from '@material-ui/core'

import { ImageContentContainer } from '../Search/style'
import { AvatarImageContainer } from './style'

const useStyles = makeStyles((theme) => ({
  info: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  userInfo: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '125px'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '175px',
      marginRight: '20px'
    }
  }
}))

const ProfilePage = ({ user }) => {
  const classes = useStyles()

  return (
    <Box className={classes.info} display="flex" flexDirection="row" justifyContent="flex-start">
      <AvatarImageContainer className={classes.avatar}>
        <ImageContentContainer>
          <img alt="default profile" src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"></img>
        </ImageContentContainer>
      </AvatarImageContainer>
      <Box>
        <Box className={classes.userInfo}>
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="body1">User since {dayjs(user.register_date).format('MMM YYYY')}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage