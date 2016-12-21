import React from 'react';

const Pin = ({location, visible}) => (
  <circle className={visible ? 'PinVisible' : 'PinInvisible'}
    cx={location.cx} cy={location.cy}
    r="10" stroke="Black" stroke-width="1" fill="Blue" >
    <title>{location.name}</title>
  </circle>
)
export default Pin
