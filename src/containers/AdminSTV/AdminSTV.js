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

import ActionButton, { CreateActionButton } from '../../components/ActionButtons/ActionButtons';
import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import AdminSTVCard from './AdminSTVCard';

import './AdminSTV.less';
import TwoActions from '../../components/TwoActions/TwoActions';
import AdminTECard from '../AdminTE/AdminTECard';
import AdminSTVAdd from './AdminSTVAdd';
import { ConfirmationWindow } from '../../components/ModalWindow/ModalWindow';

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
  @observable form = this.props.store.auth.createForm(
    `/api/territorial-entities/${this.props.params.entity}/`,
    'put',
    action((context, error) => {
      if (error) {
        const { response } = context.response;
        console.error('Error during upload', response);
        console.error(response.data.error || response.statusText);
      } else {
        const { data } = context.response;
        this.color = undefined;
        Object.keys(data).map((k) => {
          this.entity[k] = data[k];
          return null;
        });
      }
    })
  );

  @observable color = undefined;

  @observable add = false;

  @observable confirmationIsOpen = false;

  change = action((t, v) => {
    this[t] = v;
  })

  componentDidMount() {
    this.props.store.wikidata.add('country', this.entity.wikidata_id);
  }

  @computed get entity() {
    return this.props.store.data.territorialEntities.data[this.props.params.entity];
  }

  @computed get wikidata() {
    return this.props.store.wikidata.cache[this.props.params.entity];
  }

  @computed get stvs() {
    const { stvs } = this.entity;
    return Object.keys(stvs)
      .sort((a, b) => Number(stvs[a].start_date) - Number(stvs[b].start_date))
      .map((a) => stvs[a]);
  }

  @computed get data() {
    return { color: this.color };
  }

  @computed get formData() {
    let { label } = this.entity;
    if (this.wikidata && this.wikidata.current.country.label !== label) {
      label = this.wikidata.current.country.label;
    }
    return {
      label,
      color: String(this.entity.color),
      admin_level: this.entity.admin_level,
      wikidata_id: this.entity.wikidata_id,
      ...this.data,
    };
  }

  @computed get dirty() {
    return !Object.keys(this.data).every((c) => this.data[c] === undefined);
  }

  clean = () => {
    Object.keys(this.data).map((t) => this.change(t, undefined));
  }

  submit = () => {
    this.form.submit(this.formData);
    this.change('confirmationIsOpen', false);
  }

  render() {
    return (
      <AdminWrapper>
        <ConfirmationWindow
          isOpen={this.confirmationIsOpen}
          cancel={() => this.change('confirmationIsOpen', false)}
          confirm={this.submit}
          text='Do you wish to save changes?'
        />
        <AdminTECard te={this.props.params.entity} data={this.data} change={this.change} />
        {this.dirty
          ? (
            <TwoActions>
              <ActionButton text='Cancel' icon='cancel' click={this.clean} />
              <ActionButton text='Save' icon='save' click={() => this.change('confirmationIsOpen', true)} />
            </TwoActions>
          )
          : (
            <TwoActions>
              <ActionButton text='Back' icon='exit' click={() => this.props.history.push('/admin/te/')} />
              {this.entity.stv_count === 0
                ? <ActionButton text='Delete' icon='delete' click={() => null} />
                : <></>}
            </TwoActions>
          )}
        {this.add && <AdminSTVAdd entity={this.props.params.entity} />}
        <TwoActions>
          <></>
          {this.add
            ? <ActionButton text='Cancel' icon='cancel' click={() => this.change('add', false)} />
            : <CreateActionButton text='Add' click={() => this.change('add', true)} />}
        </TwoActions>
        <STVTableHeader />
        {this.stvs.map((v) => (
          <AdminSTVCard key={`stv_card_${v.id}}`} entity={this.props.params.entity} stv={v} />
        ))}

      </AdminWrapper>
    );
  }
}

export default withRouter(AdminSTV);
