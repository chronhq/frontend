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

export default class InputRange extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    return (
      <label htmlFor={this.props.name}>
        <input
          type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          step='1'
          onChange={(e) => {
            console.log('slider value:', e.target.value);
            this.setState({ value: Number(e.target.value) });
            this.props.cb({ [this.props.name]: Number(e.target.value) });
          }}
        />
        {this.props.label}
      </label>
    );
  }
}
