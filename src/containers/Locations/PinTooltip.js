import React from 'react';

const textSize = (scaleRank, scale) => {
  const font = 10 / Math.sqrt(scale);
  return Number(scaleRank) === 0
    ? font
    : font / Math.sqrt((Number(scaleRank)));
};

const textX = (location, scale) => {
  const shift = 0.3;
  const x = textSize(location.scaleRank, scale) * location.name.length * shift;
  return `${x}px`;
}

const PinTooltip = ({ location, scale }) => (
  <g key={`pin_tooltip_${location.cityId}`}className='tooltip' transform={`translate(${location.x},${location.y})`}>
    <text dy='1em' x={textX(location, scale)} textAnchor='middle' fontSize={textSize(location.scaleRank, scale)}>
      {location.name}
    </text>
  </g>
);
export default PinTooltip;
