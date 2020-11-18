import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Input, StyledButton, Textarea } from '../../shared-style';
import { BoldLabel } from './style';
import Rating from '@material-ui/lab/rating'
import { Box, Typography } from '@material-ui/core';

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'

import coffeeService from '../../services/coffee'
import tastingService from '../../services/tasting'

const ProductTasting = ({ history }) => {
  let { id } = useParams()
  const [coffee, setCoffee] = useState()
  const [loading, setLoading] = useState(false)
  const [brewMethod, setBrewMethod] = useState('')
  const [coffeeTemperature, setCoffeeTemperature] = useState('')
  const [grindSize, setGrindSize] = useState('')
  const [brewTime, setBrewTime] = useState('')
  const [coffeeWeight, setCoffeeWeight] = useState('')
  const [waterWeight, setWaterWeight] = useState('')
  const [rating, setRating] = useState(2.5)
  const [notes, setNotes] = useState('')
  
  useEffect(() => {
    const fetchCoffee = async () => {
      setLoading(true)
      const coffeeObject = await coffeeService.get(id)
      setCoffee(coffeeObject)
      setLoading(false)
    }
    fetchCoffee()
  }, [id])

  const handleSubmit = async (coffeeId, event) => {
    event.preventDefault()
    const coffeeObj = {
      coffeeId,
      brewMethod,
      coffeeTemperature,
      grindSize,
      brewTime,
      coffeeWeight,
      waterWeight,
      rating,
      notes
    }

    tastingService.add(coffeeObj)

    history.push(ROUTES.BROWSE);
  }

  if (loading || !coffee) {
    return <h2>Loading...</h2>
  }
  return (
    <Box maxWidth="600px" p="2.5rem" my="2.5rem" mx="auto" textAlign="center" border="1px solid #d9e7ea" borderRadius="4px">
    <Typography variant="h4" component="h2" style={{padding: '0 10px 40px', margin: 0}}>Tasting - {coffee.title}</Typography>
      <Box textAlign="left">
        <form onSubmit={() => handleSubmit(coffee.uid)}>
          <BoldLabel htmlFor="brewMethod">Brew Method</BoldLabel>
          <Input id="brewMethod" required placeholder="e.g. Aeropress, French press etc." value={brewMethod} onChange={({ target }) => setBrewMethod(target.value)} />

          <BoldLabel htmlFor="coffeeTemperature">Coffee Temperature (F)</BoldLabel>
          <Input id="coffeeTemperature" placeholder="e.g. 205" value={coffeeTemperature} onChange={({ target }) => setCoffeeTemperature(target.value)} />

          <BoldLabel htmlFor="grindSize">Grind Size</BoldLabel>
          <Input id="grindSize" placeholder="e.g. Fine, coarse" value={grindSize} onChange={({ target }) => setGrindSize(target.value)} />

          <BoldLabel htmlFor="brewTime">Brew Time (seconds)</BoldLabel>
          <Input id="brewTime" type="number" placeholder="e.g. 330" value={brewTime} onChange={({ target }) => setBrewTime(target.value)} />

          <BoldLabel htmlFor="coffeeWeight">Coffee Weight (g)</BoldLabel>
          <Input id="coffeeWeight" type="number" placeholder="e.g. 20" value={coffeeWeight} onChange={({ target }) => setCoffeeWeight(target.value)} />

          <BoldLabel htmlFor="waterWeight">Water Weight (g)</BoldLabel>
          <Input id="waterWeight" type="number" placeholder="e.g. 300" value={waterWeight} onChange={({ target }) => setWaterWeight(target.value)} />

          <BoldLabel htmlFor="rating">Rating</BoldLabel>
          <Box my={2}>
            <Rating id="rating" value={rating} onChange={({ target }) => setRating(Number(target.value))} name="half-rating" defaultValue={2.5} precision={0.5} />
          </Box>

          <BoldLabel htmlFor="notes">Additional Notes</BoldLabel>
          <Textarea id="notes" value={notes} onChange={({ target }) => setNotes(target.value)} />

          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </Box>
    </Box>
  )
}

const ProductTastingPage = compose(
  withRouter
)(ProductTasting)

export default ProductTastingPage