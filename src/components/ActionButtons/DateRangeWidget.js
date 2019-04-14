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

import ActionButton from './ActionButtons';
import { dateToLocaleString } from '../DatePicker/DatePickerModal';

const DateActionButton = ({ date, click }) => (
  <ActionButton text={dateToLocaleString(date)} click={click} />
);

DateActionButton.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  click: PropTypes.func.isRequired
};

const DateRangeWidget = ({ start, end, click }) => (
  <div>
    <DateActionButton date={start} click={click} />
    <span>
      {' - '}
    </span>
    <DateActionButton date={end} click={click} />
  </div>
);

DateRangeWidget.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  click: PropTypes.func.isRequired
};

export { DateActionButton };

export default DateRangeWidget;
