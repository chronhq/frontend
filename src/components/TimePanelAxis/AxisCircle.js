import React from 'react';
import PropTypes from 'prop-types';

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

Cursor.propTypes = {
  translate: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired
};

export default Cursor;
