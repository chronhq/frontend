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
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

import PropTypes from 'prop-types';

import './Axis.less';

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const axis = axisBottom()
      .scale(this.props.scale)
      .tickPadding([6])
      .tickSize(10)
      .ticks(this.props.ticks, 'f');
    select(this.svgAxis).call(axis);
  }

  render() {
    return (
      <g
        className="axisTime"
        strokeWidth="1"
        ref={(r) => { this.svgAxis = r; }}
      />
    );
  }
}

Axis.propTypes = {
  width: PropTypes.number.isRequired,
  ticks: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired
};

export default Axis;
