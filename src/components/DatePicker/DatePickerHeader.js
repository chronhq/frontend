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
import Select from '../SlimSelect';

const eras = new Array(2050 / 50).fill(0).map((m, i) => ({ label: 50 * i, value: 50 * i }));

/* eslint-disable jsx-a11y/anchor-is-valid */
const ChangeEraArrow = ({ changeEra, forward }) => (
  <a
    href=''
    onClick={(e) => { e.preventDefault(); changeEra(forward); return false; }}
  >
    <span className={`lnr lnr-${forward ? 'chevron-right' : 'chevron-left'}`} />
  </a>
);

const EraSelector = ({ era, changeEra }) => (
  <div className='datePicker-era'>
    <div className='datePicker-era-center'>
      <ChangeEraArrow changeEra={changeEra} />
      <Select
        onChange={y => changeEra(undefined, y.value)}
        placeholder='Era'
        value={{ label: era, value: era }}
        options={eras}
      />
      <ChangeEraArrow changeEra={changeEra} forward />
    </div>
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

class DatePickerHeader extends React.Component {
  render() {
    return (
      <div className='datePicker-header'>
        <EraSelector
          first={this.props.first}
          era={this.props.era}
          changeEra={this.props.changeEra}
        />
        <DateSelector
          year={this.props.year}
          month={this.props.month}
          day={this.props.day}
          setDate={this.props.setDate}
        />
      </div>
    );
  }
}

export default DatePickerHeader;
