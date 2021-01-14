import React, { useState, useEffect } from 'react'
import { withAuthorization } from '../Session'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Container, Link} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import roasterService from '../../services/roaster'
import { useParams } from "react-router-dom"
import { RoasterImageBox } from './style'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

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
    marginTop: theme.spacing(4),
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

  if (loading || !roaster) return <p>Loading...</p>

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Box py={3}>
            <RoasterImageBox width="8rem" className={classes.roastImage}>
              {roaster.imagePath ? <img alt="roaster" src='https://picsum.photos/200'></img> : null }
            </RoasterImageBox>
          </Box>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            {roaster.name}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {roaster.summary}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link component={RouterLink} color="textSecondary" to={roaster.website}>
                  <Button variant="contained" color="primary">
                    Visit Site
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Contact Seller
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {roaster.coffees && roaster.coffees.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

const condition = () => 'all'

export default withAuthorization(condition)(Roaster)