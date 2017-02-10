import React from 'react';

const PinTooltip = ({ location, visible = true }) => (
  <g key={`pin_tooltip_${location.cityId}`}className='tooltip' transform={`translate(${location.x},${location.y})`}>
    <text dy='1em' x='2em' textAnchor='middle'>
      {location.name}
    </text>
  </g>
);
export default PinTooltip;
