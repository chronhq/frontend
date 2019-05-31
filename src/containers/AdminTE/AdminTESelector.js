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

import { observer, inject } from 'mobx-react';
import {
  computed, action, observable, /* runInAction */
} from 'mobx';

import AdminTESearchResults from './AdminTESearchResults';
import AdminTESearchBar from '../../components/AdminTESearchBar/AdminTESearchBar';
import AdminTENew from './AdminTENew';
import TextTopic from './TextTopic';

@inject('store')
@observer
class AdminTESelector extends React.Component {
  @observable search = '';

  @computed get new() {
    return (this.props.add && this.search);
  }

  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get tes() {
    return this.props.store.data.territorialEntities.data;
  }

  @computed get results() {
    return Object.keys(this.tes)
      .filter(f => String(this.tes[f].wikidata_id) === this.search);
  }

  select = (te, data) => {
    this.input('');
    const d = te !== undefined
      ? {
        id: this.tes[te].id,
        label: this.tes[te].label || 'Label',
        inception: this.tes[te].inception || '2000-01-01',
        dissolution: this.tes[te].dissolution || '2000-01-02',
        wikidata_id: this.tes[te].wikidata_id,
        stv: this.tes[te].stv || 0,
      }
      : data;
    const f = {
      id: d.id,
      wikidata_id: d.wikidata_id,
      color: te !== undefined ? this.tes[te].color : 1,
      admin_level: te !== undefined ? this.tes[te].admin_level : 2,
      predecessor: [],
    };

    this.props.select(d, f);
  }

  @action input(a) {
    this.search = a;
  }

  render() {
    return (
      <div className='te-selector'>
        <TextTopic text='Search by wikidata id' />
        <AdminTESearchBar search={e => this.input(e)} />
        <AdminTESearchResults
          results={this.results}
          select={this.select}
          dirty={Boolean(this.search)}
        />
        {this.new && <AdminTENew select={this.select} />}
      </div>
    );
  }
}

AdminTESelector.defaultProps = {
  add: true,
  select: (data, form) => {
    if (data) console.log('Selecting data', data);
    if (form) console.log('Selecting form', form);
  }
};

AdminTESelector.propTypes = {
  add: PropTypes.bool,
  select: PropTypes.func,
};

export default AdminTESelector;
