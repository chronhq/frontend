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

import TwoActions from '../TwoActions/TwoActions';

import './DatePicker.less';

const minEra = 0;
const maxEra = 2000;

class DatePicker extends React.Component {
  constructor(props) {
    super();
    this.state = this.propsToState(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this.propsToState(props));
  }

  get date() {
    const d = new Date('2000-01-01');
    // UTC Month start from 0
    d.setUTCFullYear(this.state.year, this.state.month - 1, this.state.day);
    return d;
  }

  get dateString() {
    // TODO prevent from duplicating this config
    return this.date.toLocaleString(window.navigator.language || 'en-US', {
      month: 'short', year: 'numeric', day: '2-digit', timeZone: 'UTC'
    });
  }

  eraCalculator = nextYear => nextYear - (nextYear % 150)

  propsToState = next => ({
    era: this.eraCalculator(next.date.getUTCFullYear()),
    month: next.date.getUTCMonth() + 1,
  })

  setDate = (year, month, day) => (
    this.setState(s => ({
      era: this.eraCalculator(year !== undefined ? year : s.year),
      year: year !== undefined ? year : s.year,
      month: month || s.month,
      day: day || s.day,
    })))

  changeEra = era => (
    this.setState(
      (minEra <= era && maxEra >= era) ? { era } : {}
    ))

  resetEra = () => this.setDate(this.state.year);

  save = () => {
    this.props.save({ date: this.date, text: this.dateString });
  }

  render() {
    return (
      <div className='datePicker-container'>
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
        <TwoActions
          left={this.dateString}
          leftClick={this.resetEra}
          right='Save'
          rightClick={this.save}
        />
      </div>
    );
  }
}

DatePicker.defaultProps = {
  date: new Date('1800-01-01')
};

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  save: PropTypes.func.isRequired
};

export default DatePicker;
