import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import roasterService from '../../services/roaster'

import { RoasterImageBox } from './style'
import FullPageSpinner from '../../shared/components/Spinner';

const useStyles = makeStyles((theme) => ({
  roastImage: {
    alignSelf: 'center'
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
    <Container maxWidth="sm">
      <Box my={4}>
        <Box mb={2}>
          <Typography align="center" variant="h4">Small Batch Roasters</Typography>
        </Box>
      </Box>
      {roasterList.map(roaster => (
          <Box key={roaster.id}>
            <Link component={RouterLink} underline="none" to={`/roasters/${roaster.id}`}>
              <Box boxShadow={1} p={1} bgcolor="#fff" borderRadius={4} my={2}>
                <Box display="flex">
                  <Box pr="8px" className={classes.roastImage}>
                    <RoasterImageBox>
                      {roaster.imagePath ? <img alt="roaster" src={`${process.env.REACT_APP_IMAGE_PATH}/${roaster.imagePath}`}></img> : null }
                    </RoasterImageBox>
                  </Box>
                  <Box px="8px" display="flex" flexDirection="column" justifyContent="space-between" width={0} flexGrow={1}>
                    <Box whiteSpace="nowrap">
                      <Typography color="textPrimary" noWrap variant="h6">{roaster.name}</Typography>
                      <Box color="textPrimary" textOverflow="ellipsis" overflow="hidden">
                        <Typography component="span" color="textPrimary" variant="body2">{roaster.summary}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </Box>
      ))}
    </Container>
  )
}

export default Roaster