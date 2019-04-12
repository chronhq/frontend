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
import ModalWrapper from '../ModalWrapper';


const CalendarWrapper = ({ close }) => {
  const date = { day: 12, month: 6, year: 1957 };
  const style = { position: 'absolute', minWidth: '16rem', maxWidth: '20rem' };

  return (
    <ModalWrapper style={style} close={close}>
      <DatePicker save={() => null} {...date} />
    </ModalWrapper>
  );
};

class CalendarWidget extends React.Component {
  state = {
    modal: false,
  }

  get widget() {
    return this.state.modal
      ? CalendarWrapper
      : () => '';
  }

  saveDate = (d) => {
    console.log('Save', d);
  }

  toggleCalendar = () => (
    this.setState(s => ({
      modal: !s.modal
    })))

  render() {
    const Calendar = this.widget;

    return (
      <div>
        <CalendarActionButton text='Set Date' click={this.toggleCalendar} />
        <Calendar close={() => this.setState({ modal: false })} />
      </div>
    );
  }
}

export default CalendarWidget;
