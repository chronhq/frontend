/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import PropTypes from 'prop-types';

import { ActionButtonFill } from '../ActionButtons/ActionButtons';
import ModalPortalWrapper from '../ModalPortalWrapper';
import DatePicker, { DateString } from './DatePicker';

const re = new RegExp('(^-?[0-9]*)/?([0-9]*)/?([0-9]*)');

@observer
class DateInput extends React.Component {
  @observable maxYear = new Date().getUTCFullYear();

  @observable minYear = -4713;

  @observable visible = false;

  @observable cursor = {
    start: 0,
    end: 0,
  }

  @observable old = {
    negative: false,
    year: 0,
    month: 0,
    day: 0,
  };

  @observable topPos = 0;

  @observable leftPos = 0;

  close = action(() => {
    this.visible = false;
  })

  open = action((e) => {
    this.visible = true;
    const box = e.target.getBoundingClientRect();
    this.topPos = box.top;
    this.leftPos = `calc(${box.right}px + .5rem)`;
  })

  setCursor = action((start, end) => {
    this.cursor.start = start;
    this.cursor.end = end;
  })

  setValues = action((raw, year, month, day) => {
    this.old.negative = Boolean(String(raw).match(/^-/));

    if (year > this.minYear && year <= this.maxYear) {
      this.old.year = this.old.negative ? year * -1 : year;
    }

    if (!Number.isNaN(month) && month !== undefined) {
      this.old.month = (month >= 0 && month < 13) ? month : 12;
    }

    this.old.day = (day >= 0 && day < this.maxDay) ? day : this.maxDay;
    this.props.save(this.date);
  })

  parseAndSave = action((e) => {
    this.setCursor(e.target.selectionStart, e.target.selectionEnd);

    const clean = e.target.value.match(/[-0-9/]/g);
    if (clean === null) {
      this.value = null;
      return;
    }

    const values = clean.join('').match(re);
    const year = Number(values[1]);
    const month = Number(values[2].slice(0, 2));
    const day = Number(values[3].slice(0, 2));

    this.setValues(values[1], year, month, day);
  })

  keyDown = action((e) => {
    if (e.key === 'Backspace') { // ignore / while deleting
      if (this.value[e.target.selectionStart - 1] === '/') {
        e.target.setSelectionRange(e.target.selectionStart - 1, e.target.selectionStart - 1);
      }
    } else if (e.key.match(/[0-9]/)) { // replace existing symbols
      if (this.value[e.target.selectionStart] !== '/') {
        e.target.setSelectionRange(e.target.selectionStart, e.target.selectionStart + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const inc = e.key === 'ArrowUp' ? 1 : -1;
      const d = this.date;
      const curPos = this.getPosition(this.date);
      if (e.target.selectionStart <= curPos.y) {
        d.setUTCFullYear(d.getUTCFullYear() + inc);
        this.setCursor(0, this.getPosition(d).y);
      } else if (e.target.selectionStart > curPos.y && e.target.selectionStart <= curPos.m) {
        d.setUTCFullYear(d.getUTCFullYear(), d.getUTCMonth() + inc);
        this.setCursor(curPos.y + 1, this.getPosition(d).m);
      } else if (e.target.selectionStart > curPos.m) {
        d.setUTCFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + inc);
        this.setCursor(curPos.m + 1, this.getPosition(d).d);
      }
      this.value = d.getUTCFullYear() === 0 ? null : d;
      e.preventDefault();
    }
  })

  componentDidUpdate() {
    this.ref.setSelectionRange(this.cursor.start, this.cursor.end);
  }

  @computed get prepared() {
    return {
      year: this.old.year === 0
        ? this.old.year // eliminate negative zero
        : Number(`${this.old.negative ? '-' : ''}${this.old.year}`),
      date: {
        month: this.old.month === 0 ? 0 : this.old.month - 1,
        day: this.old.day || 1
      },
    };
  }

  @computed get date() {
    const date = new Date('2000-01-01');
    date.setUTCFullYear(this.prepared.year, this.prepared.date.month, this.prepared.date.day);
    return date;
  }

  @computed get maxDay() {
    const { date } = this;
    date.setUTCMonth(this.prepared.date.month + 1, 0);
    return date.getUTCDate();
  }

  @computed get value() {
    const negative = this.old.negative ? '-' : '';
    const year = this.old.year !== 0 ? this.old.year : '';
    const month = this.old.month !== 0 ? `/${this.old.month}` : '';
    const day = this.old.day !== 0 ? `/${this.old.day}` : '';
    const trailing = (year && !day) ? '/' : '';
    return `${negative}${year}${month}${day}${trailing}`;
  }

  set value(d) {
    if (d instanceof Date) {
      this.old.negative = d.getUTCFullYear() < 0;
      this.old.year = this.old.negative ? d.getUTCFullYear() * -1 : d.getUTCFullYear();
      this.old.month = d.getUTCMonth() + 1;
      this.old.day = d.getUTCDate();
    } else if (!d) {
      this.old.negative = false;
      this.old.year = 0;
      this.old.month = 0;
      this.old.day = 0;
    }
  }

  getPosition = (date) => {
    const y = String(date.getUTCFullYear()).length;
    const m = y + String(date.getUTCMonth() + 1).length + 1;
    const d = m + String(date.getUTCDate()).length + 1;
    return { y, m, d };
  }

  render() {
    const style = { top: this.topPos, left: this.leftPos };
    return this.props.readOnly ? <div className='input-text'><DateString date={this.date} /></div> : (
      <div style={{ display: 'grid', height: '2rem', gridTemplateColumns: '7rem 2rem' }}>
        <input
          ref={(r) => { this.ref = r; }}
          placeholder='YYYY/MM/DD'
          className='text=input input-text'
          value={this.value}
          onChange={this.parseAndSave}
          onKeyDown={this.keyDown}
        />
        <ActionButtonFill
          click={this.open}
          text=''
          disabled={!this.visible}
          icon='calendar--light'
          style={{ borderRadius: '0 2px 2px 0' }}
        />
        <ModalPortalWrapper
          className='date-picker__modal admin-te-card-main__font'
          isOpen={this.visible}
          close={this.close}
          style={style}
        >
          <DatePicker parent={this} />
        </ModalPortalWrapper>
      </div>
    );
  }
}

DateInput.propTypes = {
  save: PropTypes.any.isRequired
};

export default DateInput;
