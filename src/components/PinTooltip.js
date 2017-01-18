import React from 'react';

const PinTooltip = ({ location, visible = true }) => (
  <g className='tooltip' transform={'translate(' + location.cx + ',' + location.cy + ')'}>
    <text dy='1em' x='2em' textAnchor='middle'>
      {location.name}
    </text>
  </g>
);
export default PinTooltip;
