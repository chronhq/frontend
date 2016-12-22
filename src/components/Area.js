import React from 'react';

const Area = ({ id, d, label, color }) => (
  <path
    key={id} cs="100,100" d={d}
    aria-label={label} fill={color}
  />
);
export default Area;
