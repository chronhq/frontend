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
import React, { Component } from 'react';
import Select, { Option } from 'rc-select';
import PropTypes from 'prop-types';

import './InputSelect.less';

const downButton = () => (
  <svg version="1.1" width="15" height="15" viewBox="0 0 20 20">
    <path fill="#000000" d="M0 6c0-0.128 0.049-0.256 0.146-0.354 0.195-0.195 0.512-0.195 0.707 0l8.646 8.646 8.646-8.646c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-9 9c-0.195 0.195-0.512 0.195-0.707 0l-9-9c-0.098-0.098-0.146-0.226-0.146-0.354z" />
  </svg>
);

class InputSelect extends Component {
  static defaultProps = {
    value: '',
    style: {},
  }

  render() {
    return (
      <Select
        // disabled={this.state.disabled}
        style={this.props.style}
        onSelect={v => this.props.cb(v)}
        notFoundContent={false}
        dropdownMenuStyle={{ maxHeight: 400 }}
        placeholder={this.props.placeholder}
        value={this.props.value}
        optionLabelProp='children'
        inputIcon={downButton()}
        backfill
      >
        {this.props.options.map(o => (
          <Option value={o.key} key={`is-${o.key}`}>
            {o.value}
          </Option>
        ))
        }
      </Select>
    );
  }
}

InputSelect.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any, // It should be a string
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  cb: PropTypes.func.isRequired
};

export default InputSelect;
