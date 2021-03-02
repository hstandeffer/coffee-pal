import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Hidden, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import roasterService from '../../services/roaster'
import * as ROUTES from '../../constants/routes'

import { RoasterImageBox } from './style'
import { LineClampSummary } from '../../shared-style'
import FullPageSpinner, { ButtonSpinner } from '../../shared/components/Spinner';
import Seo from '../../shared/components/Seo';
import { assetUrl } from '../../shared/utils/url';

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
  const [roasterList, setRoasterList] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  const getRoasters = async (roasterId = null) => {
    const roasters = await roasterService.getAll(roasterId)
    setRoasterList(roasterList.concat(roasters))
  }

  const handleLoadMoreClick = async () => {
    setLoadMoreLoading(true)
    await getRoasters(roasterList[roasterList.length - 1].id)
    setLoadMoreLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const getInitialRoasters = async () => {
      const roasters = await roasterService.getAll()
      setRoasterList(roasters)
    }
    getInitialRoasters()
    setLoading(false)
  }, [])

  if (loading || !roasterList) {
    return <FullPageSpinner size={50} />
  }

  return (
    <Box py={3}>
      <Seo title={'All Roasters'} />
      <Container maxWidth="sm">
        <Box textAlign="center" pt={3} pb={2}>
          <Box position="relative">
            <Typography gutterBottom variant="h4">All Roasters</Typography>
            <Hidden smDown>
              <Box position="absolute" top="0" right="10px">
                <Link component={RouterLink} underline="none" to={ROUTES.ADD_ROASTER}><Button variant="outlined">Submit New</Button></Link>
              </Box>
            </Hidden>
            <Hidden mdUp>
              <Link component={RouterLink} underline="none" to={ROUTES.ADD_ROASTER}><Button size="small" variant="outlined">Submit New</Button></Link>
            </Hidden>
          </Box>
        </Box>
        <Box borderRadius="1rem" px={3} py={1} bgcolor="white">
          {roasterList.map(roaster => (
              <Box key={roaster.id}>
                <Link component={RouterLink} underline="none" to={`/roasters/${roaster.id}`}>
                  <Box boxShadow={1} p={1} bgcolor="#fff" borderRadius={4} my={2}>
                    <Box display="flex">
                      <Box pr={1} className={classes.roastImage}>
                        <RoasterImageBox>
                          {roaster.imagePath ? <img alt="roaster" src={`${assetUrl}/${roaster.imagePath}`}></img> : null }
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
          <Box py={1}>
            { loadMoreLoading 
              ? <Button variant="outlined" fullWidth><ButtonSpinner size="20" /></Button>
              : <Button variant="outlined" fullWidth onClick={handleLoadMoreClick}>Load More</Button>
            }
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Roaster