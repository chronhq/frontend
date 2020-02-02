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

import UploadWidget from './UploadWidget/UploadWidget';
import DateInput from '../../components/DateInput/DateInput';
import { julianInt } from '../../models/YearModel';
import { WaitWindow } from '../../components/ModalWindow/ModalWindow';

@inject('store')
@observer
class AdminSTVAdd extends React.Component {
  @observable startDate = undefined;

  @observable endDate = undefined;

  @observable references = ['https://chronmaps.com'];

  @observable files = [];

  @observable uploadError;

  @observable waiting = false;

  @observable specialScreen = undefined;

  @observable overlapConflicts = {};

  @observable form = this.props.store.auth.createForm(
    '/api/spacetime-volumes/',
    'post',
    action((context, error) => {
      this.waiting = false;
      this.specialScreen = undefined;
      if (error) {
        const { response } = context.response;
        if (response !== undefined) {
          this.uploadError = response.data.error || response.statusText;
          if (response.status === 409) {
            this.overlapConflicts = response.data.overlaps;
            this.specialScreen = 'overlaps';
          }
        } else {
          this.uploadError = 'Unknown Error';
        }
      } else {
        this.uploadError = undefined;
        this.specialScreen = 'edit';
      }
    }),
    action(() => {
      this.waiting = true;
    })
  );

  setDate = action((d, type) => {
    this[type] = d;
  });

  @computed get stage() {
    if (this.specialScreen) return this.specialScreen;
    if (this.form.progress) return 'uploading';
    return !this.files.length ? 'select' : 'ready';
  }

  @computed get error() {
    if (!(this.startDate instanceof Date && this.endDate instanceof Date)) {
      return 'Set the dates first';
    }
    if (this.startDate > this.endDate) {
      return 'Start date should be earlier than end date';
    }
    if (!this.files.length) return 'Select file';
    return false;
  }

  @computed get data() {
    const territory = this.files.length ? this.files[0] : undefined;
    return this.error ? {} : {
      entity: this.props.entity,
      references: this.references,
      end_date: julianInt(this.endDate),
      start_date: julianInt(this.startDate),
      territory,
    };
  }

  @computed get message() {
    if (this.stage === 'uploading') return this.uploadError;
    return this.error;
  }

  upload = () => {
    this.form.submit(this.data);
  }

  render() {
    return (
      <div className='stv-entity stv-entity__new--grid'>
        <WaitWindow isOpen={this.waiting} />
        <div style={{ gridArea: 'dates' }}>
          Start Date
          <DateInput save={(d) => this.setDate(d, 'startDate')} readOnly={this.specialScreen} />
          End Date
          <DateInput save={(d) => this.setDate(d, 'endDate')} readOnly={this.specialScreen} />
        </div>
        <div style={{ gridArea: 'content' }}>
          <UploadWidget
            data={this.data}
            files={this.files}
            selectFiles={(f) => { this.files = f; }}
            stage={this.stage}
            progress={this.form.progress}
            upload={this.upload}
            uploadError={this.uploadError}
          />
        </div>
        <div style={{ gridArea: 'message', justifySelf: 'center' }}>{this.message}</div>
      </div>
    );
  }
}

export default AdminSTVAdd;
