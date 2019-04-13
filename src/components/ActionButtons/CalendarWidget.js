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
import DatePickerModal from '../DatePicker/DatePickerModal';

class CalendarWidget extends React.Component {
  state = {
    modal: false,
  }

  saveDate = (d) => {
    console.log('Save', d);
  }

  toggleCalendar = () => (
    this.setState(s => ({
      modal: !s.modal
    })))

  render() {
    return (
      <div>
        <CalendarActionButton text='Set Date' click={this.toggleCalendar} />
        <DatePickerModal
          save={this.saveDate}
          close={() => this.setState({ modal: false })}
          isOpen={this.state.modal}
        />
      </div>
    );
  }
}

export default CalendarWidget;
