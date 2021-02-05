import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import MenuOpenIcon from '@material-ui/icons/MenuOpenRounded'
import { Box } from '@material-ui/core'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

const ProfileDrawer = ({ profileLinks, direction }) => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box pt="65px" pb={5}>
        {profileLinks}
      </Box>
    </div>
  )

  return (
    <>
      <Button onClick={toggleDrawer(direction, true)}>
        <MenuOpenIcon style={{ borderRadius: '4px', color: 'black' }} fontSize="large" />
      </Button>
      <Drawer anchor={direction} open={state[direction]} onClose={toggleDrawer(direction, false)}>
        {list(direction)}
      </Drawer>
    </>
  )
}

export default ProfileDrawer