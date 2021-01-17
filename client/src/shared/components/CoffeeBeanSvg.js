import React from 'react'
import { ReactComponent as GreyCoffeeBean } from '../../img/bean-grey.svg'
import { ReactComponent as CoffeeBean } from '../../img/bean.svg'
import { Tooltip } from '@material-ui/core'

const CoffeeBeanSvg = ({ roastType }) => (
  <>
    {!roastType ? <NoRoast />
      : roastType === 'light' ? <LightRoast />
      : roastType === 'medium' ? <MediumRoast />
      : <DarkRoast />
    }
  </>
)

const LightRoast = () => (
  <Tooltip title="Light roast">
    <div>
      <CoffeeBean /><GreyCoffeeBean /><GreyCoffeeBean />
    </div>
  </Tooltip>
)

const MediumRoast = () => (
  <Tooltip title="Medium roast">
    <div>
      <CoffeeBean /><CoffeeBean /><GreyCoffeeBean />
    </div>
  </Tooltip>
)

const DarkRoast = () => (
  <Tooltip title="Dark roast">
    <div>
      <CoffeeBean /><CoffeeBean /><CoffeeBean />
    </div>
  </Tooltip>
)

const NoRoast = () => (
  <Tooltip title="Unknown roast level">
    <div>
      <GreyCoffeeBean /><GreyCoffeeBean /><GreyCoffeeBean />
    </div>
  </Tooltip>
)

export default CoffeeBeanSvg