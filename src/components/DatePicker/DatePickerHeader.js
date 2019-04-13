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

import Select from '../SlimSelect';

const eras = new Array(2050 / 50).fill(0).map((m, i) => ({ label: 50 * i, value: 50 * i }));

const EraSelector = ({ era, changeEra }) => (
  <div className='datePicker-date'>
    <p style={{ width: '7rem' }}>Select Date</p>
    <Select
      onChange={y => changeEra(y.value)}
      placeholder='Era'
      value={{ label: era, value: era }}
      options={eras}
    />
  </div>
);

const monthEntity = (n, l = window.navigator.language || 'en-US') => ({
  label: new Date(`2000-${n}-10`).toLocaleString(l, { month: 'long' }),
  value: n
});

const months = new Array(12).fill(1).map((m, i) => monthEntity(m + i));

const getDays = max => new Array(max).fill(1).map((m, i) => ({ label: m + i, value: m + i }));

const DateSelector = ({
  year, month, day, setDate
}) => {
  // TODO check negative dates
  const maxDays = new Date(year, month, 0).getDate();
  const days = getDays(maxDays);
  if (day > maxDays) setDate(undefined, undefined, maxDays);
  const dayValue = { label: day, value: day };
  const monthValue = monthEntity(month);

  return (
    <div className='datePicker-date'>
      <Select
        onChange={m => setDate(undefined, m.value)}
        placeholder='Month'
        value={monthValue}
        options={months}
      />
      <Select
        onChange={d => setDate(undefined, undefined, d.value)}
        placeholder='Day'
        value={dayValue}
        options={days}
      />
    </div>
  );
};

const DatePickerHeader = props => (
  <div className='datePicker-header'>
    <EraSelector
      era={props.era}
      changeEra={props.changeEra}
    />
    <DateSelector
      year={props.year}
      month={props.month}
      day={props.day}
      setDate={props.setDate}
    />
  </div>
);

DatePickerHeader.propTypes = {
  changeEra: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  era: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

export default DatePickerHeader;
