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
import { DateString } from '../../components/DateInput/DatePicker';
import STVOverlapsHandler from './AdminSTVOverlaps';

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

  @observable conflicts = {};

  @observable overlaps;

  @observable form = this.props.store.auth.createForm(
    '/api/spacetime-volumes/',
    'post',
    action((context, error) => {
      this.waiting = false;
      this.specialScreen = undefined;
      if (error) {
        const { response } = context.response;
        if (response !== undefined) {
          console.log(response);
          this.uploadError = response.data.error || response.statusText;
          if (response.status === 409) {
            this.conflicts = response.data.overlaps;
            this.specialScreen = 'conflict';
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

  componentWillUnmount() {
    this.props.store.mapStyle.uploadedGeoJSON = undefined;
  }

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
    const overlaps = this.overlaps ? { overlaps: this.overlaps } : {};
    return this.error ? {} : {
      entity: this.props.entity,
      references: this.references,
      end_date: julianInt(this.endDate),
      start_date: julianInt(this.startDate),
      ...overlaps,
      territory,
    };
  }

  @computed get message() {
    if (this.stage === 'uploading') return this.uploadError;
    return this.error;
  }

  upload = () => {
    this.uploadError = undefined;
    this.form.submit(this.data);
  }

  selectFiles = (f) => {
    this.files = f;
    const file = f.length ? f[0] : undefined;
    if (!file) {
      this.files = [];
      return;
    }
    this.files = f;

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    this.props.store.mapStyle.uploadedGeoJSON = undefined;
    reader.onload = action((e) => {
      try {
        this.props.store.mapStyle.uploadedGeoJSONColor = this.props.store.data
          .territorialEntities.data[this.props.entity].color;
        this.props.store.mapStyle.uploadedGeoJSON = JSON.parse(e.target.result);
      } catch {
        this.files = [];
        this.uploadError = 'File must be in a valid GeoJSON';
      }
    });
    reader.onerror = action(() => {
      this.files = [];
      this.uploadError = 'File can not be read';
    });
  }

  cancelOverlap = () => {
    this.uploadError = 'Overlps Conflict';
    this.overlaps = {};
  }

  confirmOverlaps = (entity, value) => {
    this.overlaps = observable({
      ...(this.overlaps || {}),
      [entity]: value
    });
  }

  render() {
    return (
      <div className='stv-entity stv-entity__new--grid'>
        <WaitWindow isOpen={this.waiting} />
        <div style={{ gridArea: 'dates' }}>
          Start Date
          {!this.specialScreen
            ? <DateInput save={(d) => this.setDate(d, 'startDate')} />
            : <div className='input-text'><DateString date={this.startDate} /></div>}
          End Date
          {!this.specialScreen
            ? <DateInput save={(d) => this.setDate(d, 'endDate')} />
            : <div className='input-text'><DateString date={this.endDate} /></div>}
        </div>
        <div style={{ gridArea: 'content' }}>
          {this.stage !== 'conflict'
            ? (
              <UploadWidget
                data={this.data}
                files={this.files}
                selectFiles={this.selectFiles}
                stage={this.stage}
                progress={this.form.progress}
                upload={this.upload}
                uploadError={this.uploadError}
              />
            )
            : (
              <STVOverlapsHandler
                upload={this.upload}
                back={this.cancelOverlap}
                confirmOverlaps={this.confirmOverlaps}
                overlaps={this.overlaps || {}}
                conflicts={this.conflicts}
              />
            )}
          <br />
        </div>
        <div style={{ gridArea: 'message', justifySelf: 'center' }}>{this.message}</div>
      </div>
    );
  }
}

export default AdminSTVAdd;
