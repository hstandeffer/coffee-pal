import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';

import { Filters } from './index'

export default function TemporaryDrawer({ filters, setFilters }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const anchor = 'left' // set to where you want it to open

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>
        Show Filters{' '}<FilterListIcon />
      </Button>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        <Filters filters={filters} setFilters={setFilters} />
        {/* likely can add button here to close out of dialog since changes will apply automatically */}
      </Drawer>
    </div>
  );
}