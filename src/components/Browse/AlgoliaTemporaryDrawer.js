import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';

export default function AlgoliaTemporaryDrawer({ refinementList }) {
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
        {refinementList}
      </Drawer>
    </div>
  );
}