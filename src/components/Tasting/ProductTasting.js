import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { withFirebase } from '../Firebase/context'
import { StyledDiv, Wrapper, Input, StyledButton, Textarea } from '../../shared-style';
import { BoldLabel } from './style';

const ProductTasting = ({ firebase }) => {
  let { id } = useParams()
  const [coffee, setCoffee] = useState()
  const [loading, setLoading] = useState(false)
  const [brewMethod, setBrewMethod] = useState('')
  const [coffeeTemperature, setCoffeeTemperature] = useState('')
  const [grindSize, setGrindSize] = useState('')
  const [brewTime, setBrewTime] = useState('')
  const [coffeeWeight, setCoffeeWeight] = useState('')
  const [waterWeight, setWaterWeight] = useState('')
  const [notes, setNotes] = useState('')
  
  useEffect(() => {
    setLoading(true)
    firebase.coffee(id).once('value', snapshot => {
      if (snapshot.val()) {
        const coffeeObject = snapshot.val()
        coffeeObject['uid'] = snapshot.key
        
        setCoffee(coffeeObject)
        setLoading(false)
      }
    })
  }, [firebase, id])

  const handleSubmit = async event => {
    event.preventDefault()
    
  }

  if (loading || !coffee) {
    return <h2>Loading...</h2>
  }
  return (
    <Wrapper>
      <StyledDiv>
      <h2 style={{padding: '0 10px 40px', margin: 0}}>Tasting - {coffee.title}</h2>
        <div style={{textAlign: 'left'}}>
          <form onSubmit={handleSubmit}>
            <BoldLabel htmlFor="brewMethod">Brew Method</BoldLabel>
            <Input id="brewMethod" placeholder="e.g. Aeropress, French press etc." value={brewMethod} onChange={({ target }) => setBrewMethod(target.value)} />

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

            <BoldLabel htmlFor="notes">Additional Notes</BoldLabel>
            <Textarea id="notes" value={notes} onChange={({ target }) => setNotes(target.value)} />

            <StyledButton type="submit">Submit</StyledButton>
          </form>
        </div>
      </StyledDiv>
    </Wrapper>
  )
}

export default withFirebase(ProductTasting)