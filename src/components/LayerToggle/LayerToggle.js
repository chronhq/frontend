import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip/Tooltip';

import './LayerToggle.less';

const LayerToggle = ({ ...props }) => (
  <Tooltip placement='left' content={props.tooltip}>
    <label
      htmlFor={props.name}
      className={props.checked ? 'layer-toggle__checked layer-toggle ' : 'layer-toggle '}
      onChange={e => props.cb({ payload: { [props.name]: e.target.checked }, place: props.place })}
    >
      <input
        id={props.name}
        type="checkbox"
        checked={props.checked}
        onChange={e => props.cb({
          payload: { [props.name]: e.target.checked },
          place: props.place
        })}
      />
      <div
        className={`${props.name}_icon chron_icon chron_icon${props.checked ? '__checked' : ''}`}
      />
      <div className='layer-toggle-label'>
        {props.label}
      </div>
    </label>
  </Tooltip>
);

LayerToggle.propTypes = {
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
};

export default LayerToggle;
