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
