/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import PropTypes from 'prop-types';

import './InputCheckBox.less';

const InputCheckBox = ({
  name, checked, label, cb, disabled = false
}) => (
  <label
    htmlFor={name}
    className={disabled ? 'checkbox--disabled' : ''}
    onChange={(e) => {
      cb({ [name]: e.target.checked });
    }}
  >
    <span>
      <input
        id={name}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          cb({ [name]: e.target.checked });
        }}
      />
      <span />
    </span>
    {label}
  </label>
);

InputCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default InputCheckBox;
