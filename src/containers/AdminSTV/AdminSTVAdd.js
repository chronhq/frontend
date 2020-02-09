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

import { WaitWindow } from '../../components/ModalWindow/ModalWindow';
import { DateString } from '../../components/DateInput/DatePicker';
import STVOverlapsHandler from './AdminSTVOverlaps';
import CloseButton from '../../components/Button/CloseButton';
import AdminAdvice, { AdminAdviceButton } from '../../components/AdminAdvice/AdminAdvice';

@observer
class STVDates extends React.Component {
  render() {
    const { startDate, endDate, specialScreen } = this.props.form;
    return (
      <div style={{ gridArea: 'dates' }}>
        <div className='admin-stv-card-main__font'>Start Date</div>
        {!specialScreen
          ? <DateInput date={startDate} save={(d) => this.props.form.setDate(d, 'startDate')} />
          : <div className='input-text'><DateString date={startDate} /></div>}
        <div className='admin-stv-card-main__font'>End Date</div>
        {!specialScreen
          ? <DateInput date={endDate} save={(d) => this.props.form.setDate(d, 'endDate')} />
          : <div className='input-text'><DateString date={endDate} /></div>}
      </div>
    );
  }
}

@inject('store')
@observer
class AdminSTVAdd extends React.Component {
  @observable enabled = false;

  toggleForm = action(() => {
    this.enabled = !this.enabled;
    this.props.store.admin.stvAddFormToggle(this.enabled, this.props.entity);
  });

  componentWillUnmount() {
    this.props.store.mapStyle.uploadedGeoJSON = undefined;
  }

  @computed get form() {
    return this.props.store.admin.stvAddForm;
  }

  render() {
    return this.enabled ? (
      <div>
        <AdminAdvice text={this.form.advice} />
        <div className='stv-entity__new'>
          <CloseButton compact onClick={this.toggleForm} />
          <WaitWindow isOpen={this.form.waiting} />
          <div className='stv-entity__new--grid'>
            <STVDates form={this.form} />
            <div style={{ gridArea: 'content' }}>
              {this.form.stage !== 'conflict'
                ? <UploadWidget form={this.form} />
                : <STVOverlapsHandler form={this.form} />}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <AdminAdviceButton
        text='You can upload new territory by pressing the button'
        button='Add'
        icon='add--blue'
        click={this.toggleForm}
      />
    );
  }
}

export default AdminSTVAdd;
