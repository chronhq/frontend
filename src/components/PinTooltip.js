import React from 'react';

const textSize = (scaleRank, scale) => {
  const font = 20 / Math.sqrt(scale);
  return scaleRank === 0
    ? font
    : font / Math.sqrt((Number(scaleRank)));
};

const PinTooltip = ({ location, scale }) => (
  <g key={`pin_tooltip_${location.cityId}`}className='tooltip' transform={`translate(${location.x},${location.y})`}>
    <text dy='1em' x='2em' textAnchor='middle' fontSize={textSize(location.scaleRank, scale)}>
      {location.name}
    </text>
  </g>
);
export default PinTooltip;
