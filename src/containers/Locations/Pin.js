import React from 'react';

import './Pin.less';

// Maximum scaleRank is 10 for smallest cities
const sizeOfAPin = (scaleRank, scale) => {
  const pin = Math.sqrt(Number(scaleRank) / Math.sqrt(scale)) || 1;
  return Number(scaleRank) === 0
    ? pin
    : pin / scaleRank;
};

const Pin = ({ location, scale }) => (
  <circle
    className='PinVisible'
    cx={location.x} cy={location.y}
    r={sizeOfAPin(location.scaleRank, scale)}
    key={`pin_${location.id}`}
  >
    <title>{location.name}</title>
  </circle>
);
export default Pin;
