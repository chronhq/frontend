import React from 'react';

// Maximum scaleRank is 8 for smallest cities
const sizeOfAPin = (scaleRank, scale) => {
  const pin = Math.sqrt(Number(scaleRank) / Math.sqrt(scale)) || 1;
  return scaleRank === 0
    ? pin
    : pin / scaleRank;
};

const Pin = ({ location, visible = true, scale }) => (
  <circle
    className={visible ? 'PinVisible' : 'PinInvisible'}
    cx={location.x} cy={location.y}
    r={sizeOfAPin(location.scaleRank, scale)} stroke="Black" fill="Blue"
    key={`pin_${location.id}`}
  >
    <title>{location.name}</title>
  </circle>
);
export default Pin;
