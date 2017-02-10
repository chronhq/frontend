import React from 'react';

const Pin = ({ location, visible = true }) => (
  // className={visible ? 'PinVisible' : 'PinInvisible'}
  <circle
    className={visible ? 'PinVisible' : 'PinInvisible'}
    cx={location.x} cy={location.y}
    r="3" stroke="Black" fill="Blue"
    key={`pin_${location.id}`}
  >
    <title>{location.name}</title>
  </circle>
);
export default Pin;
