import React from 'react';

// Maximum scaleRank is 8 for smallest cities
const sizeOfAPin = scaleRank => {
  const r = Number(scaleRank) / 3 || 1;
  return r;
};

const Pin = ({ location, visible = true }) => (
  <circle
    className={visible ? 'PinVisible' : 'PinInvisible'}
    cx={location.x} cy={location.y}
    r={sizeOfAPin(location.scaleRank)} stroke="Black" fill="Blue"
    key={`pin_${location.id}`}
  >
    <title>{location.name}</title>
  </circle>
);
export default Pin;
