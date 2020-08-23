import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { withFirebase } from '../Firebase/context'
import { StyledDiv, Wrapper, Input } from '../../shared-style';

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

  if (loading || !coffee) {
    return <h2>Loading...</h2>
  }
  return (
    <Wrapper>
      <StyledDiv>    
      <h2 style={{padding: '0 10px 40px', margin: 0}}>{coffee.title}</h2>
        <div style={{textAlign: 'left'}}>
          <label htmlFor="brewMethod">Brew Method</label>
          <Input id="brewMethod" placeholder="e.g. Aeropress, French press etc." value={brewMethod} onChange={({ target }) => setBrewMethod(target.value)} />

          <label htmlFor="coffeeTemperature">Coffee Temperature</label>
          <Input id="coffeeTemperature" placeholder="e.g. 205F" value={coffeeTemperature} onChange={({ target }) => setCoffeeTemperature(target.value)} />

          <label htmlFor="grindSize">Grind Size</label>
          <Input id="grindSize" placeholder="e.g. Fine, coarse" value={grindSize} onChange={({ target }) => setGrindSize(target.value)} />

          <label htmlFor="brewTime">Brew Time</label>
          <Input id="brewTime" placeholder="e.g. 3:30" value={brewTime} onChange={({ target }) => setBrewTime(target.value)} />

          <label htmlFor="coffeeWeight">Coffee Weight</label>
          <Input id="coffeeWeight" placeholder="e.g. 20g" value={coffeeWeight} onChange={({ target }) => setCoffeeWeight(target.value)} />

          <label htmlFor="waterWeight">Water Weight</label>
          <Input id="waterWeight" placeholder="e.g. 300g" value={waterWeight} onChange={({ target }) => setWaterWeight(target.value)} />
        </div>
      </StyledDiv>
    </Wrapper>
  )
}

export default withFirebase(ProductTasting)