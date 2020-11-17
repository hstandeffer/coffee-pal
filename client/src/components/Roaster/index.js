import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import Typography from '@material-ui/core/Typography'
import { Grid, Box, Container } from '@material-ui/core';
import roasterService from '../../services/roaster'

const Roaster = () => {
  const [roasterList, setRoasterList] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getRoasters = async () => {
      const roasters = roasterService.getAll()
      setRoasterList(roasters)
    }
    getRoasters()
    setLoading(false)
  }, [roasterList])

  if (loading || !!roasterList) return <p>Loading...</p>

  return (
    <Container>
      <Box my={4} textAlign="center" width="100%">
        <Typography variant="h4">Small Batch Roasters</Typography>
        <Grid container justify="center" alignItems="center">
          {roasterList.map(roaster => (
            <Grid item xs={12}>
              <Box maxHeight="100px">
                <Typography variant="h4">{roaster.name}</Typography>
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