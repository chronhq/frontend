import React from 'react';

const Pin = ({ location, visible = true }) => (
  // className={visible ? 'PinVisible' : 'PinInvisible'}
  <circle
    className={visible ? 'PinVisible' : 'PinInvisible'}
    cx={location.cx} cy={location.cy}
    r="10" stroke="Black" fill="Blue"
    key={location.id}
  >
    <title>{location.name}</title>
  </circle>
);
export default Pin;
