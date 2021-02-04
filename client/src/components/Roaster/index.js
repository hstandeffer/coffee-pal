import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import roasterService from '../../services/roaster'

import { RoasterImageBox } from './style'
import { LineClampSummary } from '../../shared-style'
import FullPageSpinner from '../../shared/components/Spinner';
import Seo from '../../shared/components/Seo';

const useStyles = makeStyles((theme) => ({
  roastImage: {
    alignSelf: 'center'
  },
  roasterName: {
    lineHeight: 'inherit'
  }
}))

const Roaster = () => {
  const classes = useStyles();
  const [roasterList, setRoasterList] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getRoasters = async () => {
      const roasters = await roasterService.getAll()
      setRoasterList(roasters)
    }
    getRoasters()
    setLoading(false)
  }, [])

  if (loading || !roasterList) {
    return <FullPageSpinner size={50} />
  }

  return (
    <Box py={3} bgcolor="rgb(242, 242, 242)">
      <Seo title={'All Roasters'} />
      <Container maxWidth="sm">
        <Box textAlign="center" pt={3} pb={2}>
          <Typography gutterBottom variant="h4">All Roasters</Typography>
          <Button size="small" variant="outlined">Submit New</Button>
        </Box>
        <Box borderRadius="1rem" px={3} py={1} bgcolor="white">
          {roasterList.map(roaster => (
              <Box key={roaster.id}>
                <Link component={RouterLink} underline="none" to={`/roasters/${roaster.id}`}>
                  <Box boxShadow={1} p={1} bgcolor="#fff" borderRadius={4} my={2}>
                    <Box display="flex">
                      <Box pr={1} className={classes.roastImage}>
                        <RoasterImageBox>
                          {roaster.imagePath ? <img alt="roaster" src={`${process.env.REACT_APP_IMAGE_PATH}/${roaster.imagePath}`}></img> : null }
                        </RoasterImageBox>
                      </Box>
                      <Box px="8px" display="flex" flexDirection="column" justifyContent="space-between" width={0} flexGrow={1}>
                        <Box lineHeight="inherit">
                          <Typography className={classes.roasterName} color="textPrimary" variant="h6">{roaster.name}</Typography>
                          <Box color="textPrimary" textOverflow="ellipsis" overflow="hidden">
                            <LineClampSummary>{roaster.summary}</LineClampSummary>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Roaster