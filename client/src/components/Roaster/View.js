import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container} from '@material-ui/core';
import roasterService from '../../services/roaster'
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  
}))

const Roaster = () => {
  const classes = useStyles();

  const [roaster, setRoaster] = useState()
  const [loading, setLoading] = useState(true)
  let { id } = useParams()

  useEffect(() => {
    setLoading(true)
    const getRoaster = async () => {
      const roasterObj = await roasterService.get(id)
      setRoaster(roasterObj)
    }
    getRoaster()
    setLoading(false)
  }, [])

  if (loading || !roaster) return <p>Loading...</p>

  return (
    <Container>
      <Box mt={4} bgcolor="white" borderRadius="4px">
        Hello
      </Box>
    </Container>
  )
}

const condition = () => 'all'

export default withAuthorization(condition)(Roaster)