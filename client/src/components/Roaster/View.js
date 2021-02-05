import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Container, Link} from '@material-ui/core'
import roasterService from '../../services/roaster'
import { useParams } from "react-router-dom"
import { RoasterImageBox } from './style'

import Button from '@material-ui/core/Button'
import ProductGrid from '../Product/ProductGrid'
import FullPageSpinner from '../../shared/components/Spinner'
import Seo from '../../shared/components/Seo'
import { assetUrl } from '../../shared/utils/url'

const useStyles = makeStyles((theme) => ({
  roastImage: {
    margin: '0 auto',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 6),
    borderBottom: '2px solid #cacaca'
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const Roaster = () => {
  const classes = useStyles()

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
  }, [id])

  if (loading || !roaster) {
    return <FullPageSpinner size={50} />
  }

  return (
    <>
      <Seo title={roaster.name} />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Box py={3}>
            <RoasterImageBox width="8rem" className={classes.roastImage}>
              {roaster.imagePath ? <img alt="roaster" src={`${assetUrl}/${roaster.imagePath}`}></img> : null }
            </RoasterImageBox>
          </Box>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            {roaster.name}
          </Typography>
          <Typography variant="body1" align="center" color="textPrimary">
            {roaster.summary}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link color="textSecondary" href={roaster.website}>
                  <Button variant="contained" color="primary">
                    Visit Site
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <ProductGrid coffees={roaster.coffees} showEdit={false} route={'coffees'} heading={`${roaster.name}'s coffees`}/>
      </Container>
    </>
  )
}

export default Roaster