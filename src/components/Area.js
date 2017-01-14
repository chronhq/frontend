import React from 'react';

const Area = ({ id, d, label, color, opacity = 1 }) => (
  <path
    className='PinVisible'
    key={id} cs="100,100" d={d}
    aria-label={label} fill={color} opacity={opacity}
  />
);
export default Area;
