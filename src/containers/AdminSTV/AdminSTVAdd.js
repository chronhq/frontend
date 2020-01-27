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
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import SmoothCollapse from 'react-smooth-collapse';

import UploadWidget from './UploadWidget/UploadWidget';
import DateInput from '../../components/DateInput/DateInput';
import { julianInt } from '../../models/YearModel';

@inject('store')
@observer
class AdminSTVAdd extends React.Component {
  @observable startDate = undefined;

  @observable endDate = undefined;

  @observable files = [];

  setDate = action((d, type) => {
    this[type] = d;
  });

  @computed get error() {
    if (!(this.startDate instanceof Date && this.endDate instanceof Date)) {
      return 'Set the dates first';
    }
    if (this.startDate > this.endDate) {
      return 'Start date should be earlier than end date';
    }
    return false;
  }

  @computed get data() {
    return this.error ? {} : {
      end_date: julianInt(this.endDate),
      start_date: julianInt(this.startDate)
    };
  }

  render() {
    return (
      <SmoothCollapse expanded={this.props.add}>
        <div className='stv-entity stv-entity__new--grid'>
          <div style={{ gridArea: 'dates' }}>
            Start Date
            <DateInput save={(d) => this.setDate(d, 'startDate')} />
            End Date
            <DateInput save={(d) => this.setDate(d, 'endDate')} />
          </div>
          <div style={{ gridArea: 'content' }}>
            <UploadWidget
              data={this.data}
              files={this.files}
              selectFiles={(f) => { this.files = f; }}
            />
          </div>
          {this.error && <div style={{ gridArea: 'message' }}>{this.error}</div>}
        </div>
      </SmoothCollapse>
    );
  }
}

export default AdminSTVAdd;
