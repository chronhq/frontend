import React from 'react';
import PropTypes from 'prop-types';

import './LayerToggle.less';

const LayerToggle = ({ ...props }) => (
  <label
    htmlFor={props.name}
    className={props.checked ? 'layer-toggle__checked layer-toggle ' : 'layer-toggle '}
    onChange={e => props.cb({ payload: { [props.name]: e.target.checked }, place: props.place })}
  >
    <input
      id={props.name}
      type="checkbox"
      checked={props.checked}
      onChange={e => props.cb({ payload: { [props.name]: e.target.checked }, place: props.place })}
    />
    {props.label}
  </label>
);

LayerToggle.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
};

export default LayerToggle;
