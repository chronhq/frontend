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

import { CalendarActionButton } from './ActionButtons';
import DatePickerModal, { dateToLocaleString } from '../DatePicker/DatePickerModal';

class CalendarWidget extends React.Component {
  constructor(props) {
    super();
    if (props.JDN) {
      console.warn('JDN is not yet supported in Calendar Widget');
    }
    this.state = {
      modal: false,
      text: props.text,
      date: undefined,
    };
    if (props.date !== undefined) {
      this.state = {
        ...this.state,
        ...this.stateFromYear(props.date)
      };
    }
  }

  componentWillReceiveProps(props) {
    if (props.date !== undefined) this.setState(this.stateFromYear(props.date));
  }

  saveDate = (d) => {
    this.setState(this.stateFromYear(d));
    this.props.save(d);
  }

  stateFromYear = d => ({
    date: d,
    // TODO check for undefined
    text: dateToLocaleString(d),
    modal: false
  });

  toggleCalendar = () => (
    this.setState(s => ({
      modal: !s.modal
    })))

  close = () => this.setState({ modal: false })

  render() {
    return (
      <div>
        <CalendarActionButton text={this.state.text} click={this.toggleCalendar} />
        <DatePickerModal
          save={this.saveDate}
          date={this.state.date}
          close={this.close}
          isOpen={this.state.modal}
        />
      </div>
    );
  }
}

CalendarWidget.defaultProps = {
  JDN: false,
  text: 'Set Date',
  date: undefined,
};

CalendarWidget.propTypes = {
  text: PropTypes.string,
  JDN: PropTypes.bool,
  save: PropTypes.func.isRequired,
  date: PropTypes.any,
};

export default CalendarWidget;
