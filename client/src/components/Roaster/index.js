import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import roasterService from '../../services/roaster'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

import { RoasterImageBox } from './style'

import humanizeDuration from 'humanize-duration'

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    },
  },
  largest: 1
})

const useStyles = makeStyles((theme) => ({
  roastImage: {
    alignSelf: 'center'
  }
}))

const Roaster = () => {
  const classes = useStyles();

  dayjs.extend(duration)
  dayjs.extend(relativeTime)
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

  if (loading || !roasterList) return <p>Loading...</p>

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
                      {roaster.imagePath ? <img alt="roaster" src='https://picsum.photos/200'></img> : null }
                    </RoasterImageBox>
                  </Box>
                  <Box px="8px" display="flex" flexDirection="column" justifyContent="space-between" width={0} flexGrow={1}>
                    <Box whiteSpace="nowrap">
                      <Typography color="textPrimary" variant="h5">{roaster.name}</Typography>
                      <Box color="textPrimary" textOverflow="ellipsis" overflow="hidden">
                        <Typography component="span" color="textPrimary" variant="body2">{roaster.summary}</Typography>
                      </Box>
                    </Box>
                    <Typography color="textPrimary" variant="body2">{roaster.city}, {roaster.state}</Typography>
                  </Box>
                  <Box pl="8px" alignSelf="center" textAlign="right">
                    <Typography style={{color: "#575757"}} variant="body2">{shortEnglishHumanizer(dayjs.duration(dayjs(Date.now()).diff(dayjs(roaster.updatedAt)), "milliseconds").asMilliseconds())}</Typography>
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