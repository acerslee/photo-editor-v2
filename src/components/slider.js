import React from 'react';

const Slider = ({ min, max, value, filterSlider }) => (
  <div className = 'slider-box'>
    <input
      className = 'slider'
      type = 'range'
      min = {min}
      max = {max}
      value = {value}
      onChange = {filterSlider}
      style = {{
        width: '20vw'
      }}
    />
    <p>{value}</p>
  </div>
);

export default Slider;