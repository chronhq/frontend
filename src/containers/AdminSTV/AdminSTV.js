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
import { inject, observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import SmoothCollapse from 'react-smooth-collapse';

import ActionButton, { CreateActionButton } from '../../components/ActionButtons/ActionButtons';
import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import AdminSTVCard from './AdminSTVCard';

import './AdminSTV.less';
import TwoActions from '../../components/TwoActions/TwoActions';
import AdminTECard from '../AdminTE/AdminTECard';
import UploadWidget from '../../components/ActionButtons/UploadWidget';
import CalendarWidget from '../../components/ActionButtons/CalendarWidget';
import DateInput from '../../components/ActionButtons/DateInput';

const STVTableHeader = () => (
  <div className='tooltip-author stv-entity--grid'>
    <div style={{ justifySelf: 'center' }}>Dates</div>
    <div style={{ justifySelf: 'center' }}>Visual Center</div>
    <div style={{ justifySelf: 'center' }}>Source URL</div>
    <div style={{ justifySelf: 'center' }}>Download Delete</div>
  </div>
);

@inject('store')
@observer
class AdminSTV extends React.Component {
  @observable color = undefined;

  @observable add = false;

  change = action((t, v) => {
    this[t] = v;
  })

  @computed get stvs() {
    const { stvs } = this.props.store.data.territorialEntities.data[this.props.params.entity];
    return Object.keys(stvs)
      .sort((a, b) => Number(stvs[a].start_date) - Number(stvs[b].start_date))
      .map((a) => stvs[a]);
  }


  @computed get data() {
    return { color: this.color };
  }

  @computed get dirty() {
    return !Object.keys(this.data).every((c) => this.data[c] === undefined);
  }

  clean = () => {
    Object.keys(this.data).map((t) => this.change(t, undefined));
  }

  render() {
    // const data = this.props.store.admin.stvs;
    return (
      <AdminWrapper>
        <AdminTECard te={this.props.params.entity} data={this.data} change={this.change} />
        <TwoActions>
          {this.dirty
            ? <ActionButton text='Cancel' icon='cancel' click={this.clean} />
            : <ActionButton text='Back' icon='exit' click={() => this.props.history.push('/admin/te/')} />}
          <ActionButton text='Save' icon='save' click={() => null} />
        </TwoActions>
        <SmoothCollapse expanded={this.add}>
          <div className='stv-entity stv-entity--grid stv-entity--new'>
            <div style={{ gridArea: '1 / 1 / 1 / 3' }}>
              <CalendarWidget />
              <DateInput />
              <DateInput />
            </div>
            <div style={{ gridArea: '1 / 3 / 1 / 5' }}>
              <UploadWidget />
            </div>
          </div>
        </SmoothCollapse>
        <TwoActions>
          <></>
          {this.add
            ? <ActionButton text='Cancel' icon='cancel' click={() => this.change('add', false)} />
            : <CreateActionButton text='Add' click={() => this.change('add', true)} />}
        </TwoActions>
        <STVTableHeader />
        {this.stvs.map((v) => (
          <AdminSTVCard key={`stv_card_${v.id}}`} te={this.props.params.entity} stv={v} />
        ))}

      </AdminWrapper>
    );
  }
}

export default withRouter(AdminSTV);
