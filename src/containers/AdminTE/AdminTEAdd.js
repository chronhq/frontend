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
import { observer, inject } from 'mobx-react';
import { computed, action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import AdminTESearchBar from '../../components/InputText/AdminTESearchBar';
import TextTopic from './TextTopic';
import AdminTESearchCard from './AdminTECard';
import AdminAdvice, { AdminAdviceButton } from '../../components/AdminAdvice/AdminAdvice';
import CloseButton from '../../components/Button/CloseButton';
import { WaitWindow } from '../../components/ModalWindow/ModalWindow';


@inject('store')
@observer
class AdminTEAdd extends React.Component {
  @observable enabled = false;

  @observable wait = false;

  @observable wId = undefined;

  @observable form = this.props.store.auth.createForm(
    '/api/territorial-entities/',
    'post',
    action((context, error) => {
      this.wait = false;
      if (error) {
        const { response } = context.response;
        if (response !== undefined) {
          console.error('Error during upload', response);
          console.error(response.data.error || response.statusText);
        } else {
          console.error('Unknown error');
          console.error(context);
        }
      } else {
        const { data } = context.response;
        this.props.store.data.territorialEntities.data[data.id] = data;
        this.props.history.push(`/admin/te/${data.id}`);
      }
    })
  );

  toggleForm = action(() => { this.enabled = !this.enabled; })

  search = action((a) => {
    const n = Number(a);
    if (n) {
      this.wId = n;
      this.props.store.wikidata.add('country', n);
    }
  })

  select = action(() => {
    console.log('Executing select');
    const keys = Object.keys(this.props.store.data.mapcolorscheme.data);
    if (keys.length === 0) console.error('Map color scheme is empty');
    const color = keys.length === 0 ? 1 : keys[Math.ceil(Math.random() * keys.length)];
    this.wait = true;
    this.form.submit({
      color,
      wikidata_id: this.wId,
      label: this.wikidata.country.label,
      admin_level: 2,
    });
  })

  @computed get wikidata() {
    return this.wId in this.props.store.wikidata.cache
      ? this.props.store.wikidata.cache[this.wId].current
      : { country: {} };
  }

  @computed get data() {
    return {
      id: undefined,
      label: this.wikidata.country.label,
      inception: this.wikidata.country.inception,
      dissolution: this.wikidata.country.dissolution,
      wikidata_id: this.wId,
      stv_count: 0,
    };
  }

  @computed get advice() {
    return !this.wId
      ? 'Visit wikidata.org to get entity id.'
      : 'Click on the entity card to add';
  }

  onlyNumbers = (t) => {
    const res = t.match(/[0-9]+/);
    return res ? String(res) : '';
  }

  render() {
    return this.enabled ? (
      <>
        <AdminAdvice text={this.advice} />
        <WaitWindow
          isOpen={this.wait}
          task='Sending data to server'
          timerMax={60}
        />
        <div className='te-selector' style={{ position: 'relative', paddingTop: '1rem' }}>
          <CloseButton compact onClick={this.toggleForm} task='Creating new entity' />
          <TextTopic text='Enter wikidata id for entity' />
          <AdminTESearchBar search={(e) => this.search(e)} validate={this.onlyNumbers} />
          {this.data.label !== undefined && (
            <AdminTESearchCard data={this.data} select={this.select} />
          )}
        </div>
      </>
    ) : (
      <AdminAdviceButton
        text='To add a new entity to the database click this button'
        button='Add'
        icon='add--blue'
        click={this.toggleForm}
      />
    );
  }
}

export default withRouter(AdminTEAdd);
