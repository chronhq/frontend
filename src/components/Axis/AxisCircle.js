import React from 'react';

import './AxisCircle.less';

const Cursor = ({ translate, active }) => (
  <g>
    <circle
      cx='0'
      r={active ? 7 : 5}
      className={active ? 'inner-circle inner-circle--active' : 'inner-circle'}
      transform={`translate(${translate}, 0)`}
    />
  </g>
);

export default Cursor;
