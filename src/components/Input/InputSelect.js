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

class InputSelect extends Component {
  defaultProps = {
    value: this.props.placeholder
  }

  render() {
    return (
      <Select
        // disabled={this.state.disabled}
        style={{ width: '220px' }}
        onSelect={v => this.props.cb(v)}
        notFoundContent={false}
        dropdownMenuStyle={{ maxHeight: 400 }}
        placeholder={this.props.placeholder}
        value={this.props.value}
        backfill
      >
        {Object.keys(this.props.options).map(key => (
          <Option value={this.props.options[key]} key={key} text={this.props.options[key]}>
            {this.props.options[key]}
          </Option>
        ))
        }
      </Select>
    );
  }
}

InputSelect.propTypes = {
  value: PropTypes.any, // It should be a string
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  cb: PropTypes.func.isRequired
};

InputSelect.defaultProps = {
  value: undefined
};

export default InputSelect;
