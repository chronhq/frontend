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
import ActionButton, { ChangeActionButton } from '../ActionButtons/ActionButtons';

import './DatePicker.less';

const minEra = 0;
const maxEra = 2000;


export const dateToLocaleString = (date) => {
  try {
    return date.toLocaleString(window.navigator.language || 'en-US', {
      month: 'short', year: 'numeric', day: '2-digit', timeZone: 'UTC'
    });
  } catch (e) {
    return 'No Date';
  }
};

class DatePicker extends React.Component {
  constructor(props) {
    super();
    this.state = this.propsToState(props);
  }

  getDerivedStateFromProps(props) {
    return this.propsToState(props);
  }

  get date() {
    const d = new Date('2000-01-01');
    // UTC Month start from 0
    d.setUTCFullYear(this.state.year, this.state.month - 1, this.state.day);
    return d;
  }

  eraCalculator = nextYear => nextYear - (nextYear % 100 % 50)

  propsToState = next => ({
    era: this.eraCalculator(next.date.getUTCFullYear()),
    year: next.date.getUTCFullYear(),
    month: next.date.getUTCMonth() + 1,
    day: next.date.getDate(),
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
    this.props.save(this.date);
  }

  render() {
    return (
      <div className='date-picker__container'>
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
        <TwoActions>
          <ActionButton icon='redo' text={dateToLocaleString(this.date)} click={this.resetEra} />
          <ChangeActionButton icon='save' text='Save' click={this.save} />
        </TwoActions>
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
