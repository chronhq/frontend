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

import ActionButton from '../../components/ActionButtons/ActionButtons';
import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import AdminSTVCard from './AdminSTVCard';

import './AdminSTV.less';
import TwoActions from '../../components/TwoActions/TwoActions';
import AdminTECard from '../AdminTE/AdminTECard';
import AdminSTVAdd from './AdminSTVAdd';
import { ConfirmationWindow, WaitWindow } from '../../components/ModalWindow/ModalWindow';

const STVTableHeader = () => (
  <div className='tooltip-author stv-entity--grid'>
    <div style={{ justifySelf: 'center' }}>Dates</div>
    <div style={{ justifySelf: 'center' }}>Visual Center</div>
    <div style={{ justifySelf: 'center' }}>Source URL</div>
    <div style={{ justifySelf: 'center' }}>Actions</div>
  </div>
);

@inject('store')
@observer
class AdminSTV extends React.Component {
  @observable form = this.props.store.auth.createForm(
    `/api/territorial-entities/${this.props.params.entity}/`,
    'put',
    action((context, error) => {
      this.change('waiting', false);
      const method = context.reqOverwrite.method || context.method;
      if (error) {
        const { response } = context.response;
        console.error('Error during upload', response);
        console.error(response.data.error || response.statusText);
      } else if (method.match(/PUT/i)) {
        const { data } = context.response;
        this.color = undefined;
        Object.keys(data).map((k) => {
          this.entity[k] = data[k];
          return null;
        });
      }
      if (method.match(/DELETE/i)) {
        this.goBack();
        delete this.props.store.data
          .territorialEntities.data[this.props.params.entity];
      }
    })
  );

  @observable waiting = false;

  @observable color = undefined;

  @observable add = false;

  @observable confirmationIsOpen = false;

  @observable deleteIsOpen = false;

  change = action((t, v) => {
    this[t] = v;
  })

  componentDidMount() {
    if (this.entity.empty) {
      this.goBack();
      return;
    }
    // Fetch non-cached territorial entity data
    const ts = Number(new Date());
    this.props.store.data.territorialEntities.get(`?t=${ts}`, this.props.params.entity, true);

    this.props.store.wikidata.add('country', this.entity.wikidata_id);
  }

  @computed get entity() {
    return this.props.store.data.territorialEntities.data[this.props.params.entity] || {
      empty: true,
      stvs: [],
    };
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

  goBack = () => this.props.history.push('/admin/te/')

  submit = () => {
    this.change('waiting', true);
    this.change('confirmationIsOpen', false);
    this.form.submit(this.formData);
  }

  delete = () => {
    this.change('waiting', true);
    this.change('deleteIsOpen', false);
    this.form.submit({}, { method: 'DELETE' });
  }

  render() {
    return (
      <AdminWrapper>
        <ConfirmationWindow
          isOpen={this.confirmationIsOpen}
          cancel={() => this.change('confirmationIsOpen', false)}
          confirm={this.submit}
          text='Do you want to save changes?'
        />
        <ConfirmationWindow
          isOpen={this.deleteIsOpen}
          cancel={() => this.change('deleteIsOpen', false)}
          confirm={this.delete}
          text='Do you want to delete this entity?'
        />
        <WaitWindow
          isOpen={this.waiting}
          task='Sending data to server'
          timerMax={60}
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
              <ActionButton text='Back' icon='exit' click={this.goBack} />
              {!this.entity.stv_count
                ? <ActionButton text='Delete' icon='delete' click={() => this.change('deleteIsOpen', true)} />
                : <></>}
            </TwoActions>
          )}
        <AdminSTVAdd entity={this.props.params.entity} cancel={() => this.change('add', false)} />
        {this.stvs.length ? <STVTableHeader /> : null}
        {this.stvs.map((v) => (
          <AdminSTVCard key={`stv_card_${v.id}}`} entity={this.props.params.entity} stv={v} />
        ))}

      </AdminWrapper>
    );
  }
}

export default withRouter(AdminSTV);
