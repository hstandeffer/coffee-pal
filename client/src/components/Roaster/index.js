import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import Typography from '@material-ui/core/Typography'
import { Grid, Box, Container } from '@material-ui/core';
import roasterService from '../../services/roaster'

const Roaster = () => {
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
        <Grid container justify="center">
          {roasterList.map(roaster => (
            <Grid key={roaster.id} item xs={10}>
              <Box boxShadow={1} p={2} bgcolor="#fff" borderRadius={4} mb={4} mt={3} maxHeight="100px">
                <Box position="relative" width="100%">
                  {roaster.imagePath ? <img src={roaster.imagePath} style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', width: '100%', objectFit: 'contain', objectPosition: 'center' }}></img> : null }
                </Box>
                <Typography variant="h5">{roaster.name}</Typography>
                <Typography variant="h6">{roaster.city}, {roaster.state}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

const condition = () => 'all'

export default withAuthorization(condition)(Roaster)