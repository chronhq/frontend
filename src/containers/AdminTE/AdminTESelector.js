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
import { computed, action, runInAction } from 'mobx';

import AdminTESearchResults from './AdminTESearchResults';
import AdminTENew from './AdminTENew';
import TextTopic from './TextTopic';

@inject('store')
@observer
class AdminTESelector extends React.Component {
  componentDidMount() {
    runInAction(() => {
      this.form.data.search = '';
      this.form.data.wikidataId = '';
      this.form.data.te = undefined;
      this.form.data.new = false;
    });
  }

  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get search() {
    return this.form.data.search;
  }

  @computed get tes() {
    return this.props.store.data.territorialEntities.data;
  }

  @computed get results() {
    return Object.keys(this.tes)
      .filter(f => String(this.tes[f].wikidata_id) === this.form.data.search);
  }

  @action input(a) {
    this.form.data.search = a.target.value;
  }

  render() {
    return (
      <div className='te-selector'>
        <TextTopic text='1.1 Search by wikidata id' />
        <div className='te-selector__search'>
          <input type='search' value={this.form.data.search} onChange={e => this.input(e)} />
        </div>
        <AdminTESearchResults results={this.results} />
        <AdminTENew />
      </div>
    );
  }
}

export default AdminTESelector;
