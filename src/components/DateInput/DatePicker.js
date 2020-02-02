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
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';

import julian from 'julian';

import { ActionButtonFill } from '../ActionButtons/ActionButtons';

import './DatePicker.less';

export const dateToLocaleString = (date) => {
  try {
    return date.toLocaleString(window.navigator.language || 'en-US', {
      month: 'short', year: 'numeric', day: '2-digit', timeZone: 'UTC'
    });
  } catch (e) {
    return 'No Date';
  }
};

const monthLabel = (n, l = window.navigator.language || 'en-US') => (
  new Date(`2000-${n}-10`).toLocaleString(l, { month: 'short' })
);

const monthLabels = new Array(12).fill(1).map((v, idx) => monthLabel(idx + v));

export const DateFromJulian = ({ date = undefined }) => {
  if (date === undefined || date === null) return 'No Date';
  try {
    const d = julian.toDate(Number(date));
    return dateToLocaleString(d);
  } catch (e) {
    console.error('Invalid date', date);
    console.error(e);
    return 'Failed';
  }
};

export const DateString = ({ date = undefined }) => dateToLocaleString(date);

const DatePickerHeaderLite = ({ text, back, close }) => (
  <div className='date-picker__header'>
    <ActionButtonFill
      click={back}
      text=''
      icon={close ? 'cross--blue' : 'back--blue'}
      style={{ height: '1.25rem', width: '1.25rem', backgroundColor: 'transparent' }}
    />
    <div>
      {text}
    </div>
  </div>
);

const PickerEntity = ({
  label, onClick = () => true, selected, sideEffect
}) => {
  const classNames = [];
  if (selected) classNames.push('date-picker__entity--selected');
  if (sideEffect) classNames.push('admin-stv-card-main__font');
  const className = classNames.join(' ');
  return (
    <div
      className={className}
      onClick={() => onClick(label)}
      onKeyPress={() => onClick(label)}
      tabIndex={0}
      role='button'
    >
      {label}
    </div>
  );
};

@observer
class DatePicker extends React.Component {
  @observable screenList = ['century', 'decade', 'year', 'month', 'day'];

  @observable stepList = [100, 10, 1];

  @observable screen = 0;

  @observable shiftList = [0, 0, 0];

  @observable yearList = [0, 0, 0];

  setYear = (y) => {
    const { month, day } = this.props.parent.prepared.date;
    this.props.parent.setValues(y, y, month + 1, day);
  }

  setMonth = (m) => {
    const p = this.props.parent.prepared;
    this.props.parent.setValues(p.year, p.year, m, p.date.day);
  }

  setDay = (d) => {
    const p = this.props.parent.prepared;
    this.props.parent.setValues(p.year, p.year, p.date.month + 1, d);
  }

  setShift = action((b) => {
    const v = this.yearValues.values.length;
    const maxScreen = this.rangeLimits.steps - (v + 1);
    let s = b
      ? this.shiftList[this.screen] + v
      : this.shiftList[this.screen] - v;
    if (s < 0) s = 0;
    if (s > maxScreen) s = maxScreen;
    this.shiftList[this.screen] = s;
  })

  setScreenDate = action((y) => {
    this.yearList[this.screen] = y;
    let next = this.screen + 1;
    if (next < 3) {
      const limits = this.limits[next];
      let s = (limits.max - y - this.rangeLimits.step) / limits.step;
      if (s < 0) s = 0;
      if (s > limits.steps) s = limits.steps;
      this.shiftList[next] = s;
    } else if (y !== 0) {
      this.setYear(y);
    } else {
      this.props.parent.setValues(0, 0, 0, 0);
      next = 0;
    }
    this.screen = next;
  })

  setScreenMonth = action((m) => {
    this.setMonth(m);
    this.screen = this.screen + 1;
  });

  setScreenDay = (d) => {
    this.setDay(d);
    this.props.parent.close();
  }

  @computed get limits() {
    const { minYear, maxYear } = this.props.parent;
    return this.stepList.map((step) => {
      const max = maxYear - (maxYear % step);
      const min = minYear - (minYear % step);
      const steps = (max - min) / step;
      return {
        max, min, steps, step,
      };
    });
  }

  @computed get rangeLimits() {
    return this.limits[this.screen];
  }

  @computed get yearValues() {
    const shift = this.shiftList[this.screen];
    const values = [];
    while ((values.length < 10)) {
      const tmp = this.rangeLimits.max - ((values.length + shift + 1) * this.rangeLimits.step);
      if (tmp <= this.rangeLimits.min) break;
      values.push(tmp);
    }
    const max = this.rangeLimits.max - (shift * this.rangeLimits.step);
    const min = this.rangeLimits.max - ((values.length + shift + 1) * this.rangeLimits.step);
    values.reverse();
    return {
      max,
      min,
      values
    };
  }

  @computed get yearsSelected() {
    const { year } = this.props.parent.prepared;
    return year - (year % this.rangeLimits.step);
  }

  @computed get yearsScreen() {
    const isMin = this.yearValues.min === this.rangeLimits.min;
    const isMax = this.yearValues.max === this.rangeLimits.max;
    return (
      <div className='date-picker__content'>
        <PickerEntity
          key={`year-${this.yearValues.min}`}
          label={this.yearValues.min}
          // selected={this.yearValues.min === this.yearsSelected}
          sideEffect={!isMin}
          onClick={isMin
            ? () => this.setScreenDate(this.yearValues.min)
            : () => this.setShift(true)}
        />
        {this.yearValues.values.map((v) => (
          <PickerEntity
            key={`year-${v}`}
            label={v}
            selected={v === this.yearsSelected}
            onClick={() => this.setScreenDate(v)}
          />
        ))}
        <PickerEntity
          key={`year-${this.yearValues.max}`}
          label={this.yearValues.max}
          // selected={this.yearValues.max === this.yearsSelected}
          sideEffect={!isMax}
          onClick={isMax
            ? () => this.setScreenDate(this.yearValues.max)
            : () => this.setShift(false)}
        />
      </div>
    );
  }

  @computed get daysScreen() {
    const max = new Array(this.props.parent.maxDay).fill(1).map((v, idx) => idx + v);
    const { day } = this.props.parent.prepared.date;
    return (
      <div className='date-picker__content date-picker__content--days'>
        {max.map((v) => (
          <PickerEntity key={`day-${v}`} selected={day === v} label={v} onClick={() => this.setScreenDay(v)} />
        ))}
      </div>
    );
  }

  @computed get monthsScreen() {
    const { month } = this.props.parent.prepared.date;
    return (
      <div className='date-picker__content'>
        {monthLabels.map((v, idx) => (
          <PickerEntity
            key={`month-${v}`}
            selected={month === idx}
            label={v}
            onClick={() => this.setScreenMonth(idx + 1)}
          />
        ))}
      </div>
    );
  }

  render() {
    const screen = this.screenList[this.screen];
    const back = this.screen === 0
      ? () => this.props.parent.close()
      : () => { this.screen = this.screen - 1; };

    return (
      <div className='float-container date-picker__container'>
        <DatePickerHeaderLite text={`Choose ${screen}`} back={back} close={this.screen === 0} />
        {screen === 'day' && this.daysScreen}
        {screen === 'month' && this.monthsScreen}
        {this.screen < 3 && this.yearsScreen}
      </div>
    );
  }
}


export default DatePicker;
