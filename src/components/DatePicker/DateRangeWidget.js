/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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

import { dateToLocaleString } from './DatePickerModal';

import './DateRangeWidget.less';

const DateRangeWidget = ({ start, end }) => (
  <div className='date-range-widget'>
    <span>{dateToLocaleString(start)}</span>
    <span className='icon icon-chevron-right date-range-widget__icon' />
    <span>{dateToLocaleString(end)}</span>
  </div>
);

DateRangeWidget.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
};

export default DateRangeWidget;
