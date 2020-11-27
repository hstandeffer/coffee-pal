import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Link, Chip } from '@material-ui/core';
import roasterService from '../../services/roaster'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

import { RoasterImageBox } from './style'

const useStyles = makeStyles((theme) => ({
  roastImage: {
    alignSelf: 'center'
  },
  chips: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        margin: theme.spacing(0.25),
      },
    }
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
    <Container>
      <Box my={4} width="100%">
        <Typography align="center" variant="h4">Small Batch Roasters</Typography>
        <Grid container>
          {roasterList.map(roaster => (
            <Grid key={roaster.id} container justify="center">
              <Grid item xs={12} sm={10}>
                <Link underline="none" href={`/roasters/${roaster.id}`}>
                  <Box boxShadow={1} p={2} bgcolor="#fff" borderRadius={4} mb={4} mt={3}>
                    <Grid container spacing={2}>
                      <Grid className={classes.roastImage} item xs={3} sm={2}>
                        <RoasterImageBox>
                          {roaster.imagePath ? <img alt="roaster" src='https://picsum.photos/200' style={{ borderRadius: '4px', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', width: '100%', objectFit: 'contain', objectPosition: 'center' }}></img> : null }
                        </RoasterImageBox>
                      </Grid>
                      <Grid container item justify="space-between" direction="column" xs={6} md={6}>
                        <Box>
                          <Typography color="textPrimary" variant="h5">{roaster.name}</Typography>
                          <Typography color="textPrimary" variant="h6">{roaster.summary}</Typography>
                          <Typography color="textPrimary" variant="body2">{roaster.city}, {roaster.state}</Typography>
                        </Box>
                        <Grid container item direction="row">
                          <Typography style={{color: "#575757"}} variant="body2">Posted {dayjs.duration(dayjs(Date.now()).diff(dayjs(roaster.updatedAt)), "milliseconds").humanize()} ago</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={3} sm={4}>
                        <Box className={classes.chips}>
                          <Chip label="light" variant="outlined" color="primary" />
                          <Chip label="light roast" variant="outlined" color="primary" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

const condition = () => 'all'

export default withAuthorization(condition)(Roaster)