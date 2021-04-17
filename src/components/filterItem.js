import React from 'react';
import Button from '@material-ui/core/Button';

const FilterItem = ({ name, active, handleClick }) => (
  <Button
    color = 'primary'
    className = {`filter-item ${active ? 'active' : ''}`}
    onClick = {handleClick}
  >
    {name}
  </Button>
);

export default FilterItem;