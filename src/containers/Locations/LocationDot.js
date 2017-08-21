import React from 'react';

import './LocationDot.less';

// Maximum scaleRank is 10 for smallest cities
const sizeOfALocationDot = (scaleRank, scale) => {
  const pin = Math.sqrt(Number(scaleRank) / Math.sqrt(scale)) || 1;
  return Number(scaleRank) === 0
    ? pin
    : pin / scaleRank;
};

const LocationDot = ({ location, scale }) => (
  <circle
    className='LocationDotVisible'
    cx={location.x}
    cy={location.y}
    r={sizeOfALocationDot(location.scaleRank, scale)}
    key={`pin_${location.id}`}
  >
    <title>{location.name}</title>
  </circle>
);
export default LocationDot;
