import React from 'react';

const textSize = (scaleRank, scale) => {
  const font = 10 / Math.sqrt(scale);
  return Number(scaleRank) === 0
    ? font
    : font / Math.sqrt((Number(scaleRank)));
};

const textX = (location, scale, px = true) => {
  const shift = 0.3;
  const x = textSize(location.scaleRank, scale) * location.name.length * shift;
  return px ? `${x}px` : x;
};

export const getTooltipSize = (location, scale) => {
  const curTextY = textSize(location.scaleRank, scale); // Not accurate
  const curTextX = textX(location, scale, false);
  const obj = {
    top: location.y,
    bottom: location.y + curTextY,
    left: location.x,
    right: location.x + (2 * curTextX),
  };
  return obj;
};

const LocationDotLabel = ({ location, scale }) => (
  <g key={`pin_tooltip_${location.cityId}`} className='tooltip' transform={`translate(${location.x},${location.y})`}>
    <text y='1em' x={textX(location, scale)} textAnchor='middle' fontSize={textSize(location.scaleRank, scale)}>
      {location.name}
    </text>
  </g>
);
export default LocationDotLabel;
