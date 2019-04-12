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

import DatePickerHeader from './DatePickerHeader';
import DatePickerYears from './DatePickerYears';

import './DatePicker.less';

const minEra = 0;
const maxEra = 2000;

class DatePicker extends React.Component {
  state = {
    era: 1950,
    year: 1958,
    month: 1,
    day: 1,
  }

  componentWillReceiveProps(next) {
    const state = this.nextState(next.year);
    this.setState({
      ...state,
      month: next.month,
      day: next.day
    });
  }

  get date() {
    const d = new Date('2000-01-01');
    d.setUTCFullYear(this.state.year, this.state.month - 1, this.state.day);
    return d;
  }

  get dateString() {
    return this.date.toLocaleString(window.navigator.language || 'en-US', {
      month: 'short', year: 'numeric', day: '2-digit', timeZone: 'UTC'
    });
  }

  nextState = (newYear) => {
    // TODO fix negative dates
    const year = newYear % 100;
    const era = newYear - (year % 50);
    return {
      year: newYear,
      era,
    };
  }

  setDate = (year, month, day) => {
    if (year) this.setState(this.nextState(year));
    if (month) this.setState({ month });
    if (day) this.setState({ day });
  }

  changeEra = (forward, exact) => {
    this.setState((state) => {
      const i = forward ? 50 : -50;
      const era = exact || state.era + i;
      return (minEra <= era && maxEra >= era)
        ? { era }
        : {};
    });
  }

  render() {
    return (
      <div className='datePicker-container'>
        <p>Select Date</p>
        <DatePickerHeader
          {...this.state}
          changeEra={this.changeEra}
          setDate={this.setDate}
        />
        <hr />
        <DatePickerYears
          era={this.state.era}
          year={this.state.year}
          setDate={this.setDate}
        />
        <hr />
        <p>{this.dateString}</p>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  year: 1800,
  month: 1,
  day: 1
};

DatePicker.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  save: PropTypes.func.isRequired
};

export default DatePicker;
