import React from 'react';

const textSize = scaleRank => {
  const r = (20 / Number(scaleRank)) + 2 || 10;
  return r;
};

const PinTooltip = ({ location, visible = true }) => (
  <g key={`pin_tooltip_${location.cityId}`}className='tooltip' transform={`translate(${location.x},${location.y})`}>
    <text dy='1em' x='2em' textAnchor='middle' fontSize={textSize(location.scaleRank)}>
      {location.name}
    </text>
  </g>
);
export default PinTooltip;
