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

import { CalendarActionButton } from './ActionButtons';
import DatePicker from '../DatePicker/DatePicker';

class CalendarWidget extends React.Component {
  state = {
    active: false,
  }

  get widget() {
    const date = { day: 12, month: 6, year: 1957 };
    return this.state.active
      ? () => (
        <div style={{
          position: 'absolute',
          minWidth: '16rem',
          maxWidth: '20rem',
        }}
        >
          <DatePicker save={this.save} {...date} />
        </div>
      )
      : () => '';
  }

  saveDate = (d) => {
    console.log('Save', d);
  }

  toggleCalendar = () => (
    this.setState(s => ({
      active: !s.active
    })))

  render() {
    const Calendar = this.widget;

    return (
      <div>
        <CalendarActionButton text='Set Date' click={this.toggleCalendar} />
        <Calendar />
      </div>
    );
  }
}

export default CalendarWidget;
