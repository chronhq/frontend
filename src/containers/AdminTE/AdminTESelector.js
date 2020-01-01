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
import { computed } from 'mobx';

import AdminTESearchResults from './AdminTESearchResults';
import AdminTESearchBar from '../../components/AdminTESearchBar/AdminTESearchBar';
import TextTopic from './TextTopic';

@inject('store')
@observer
class AdminTESelector extends React.Component {
  @computed get search() {
    return this.props.store.search.TerritorialEntities;
  }

  @computed get results() {
    return Object.keys(this.search.filtered).sort((a, b) => Number(a) > Number(b));
  }

  render() {
    return (
      <div className='te-selector'>
        <TextTopic text='Find territorial entity in the database' />
        <AdminTESearchBar search={(e) => this.search.setText(e)} />
        <AdminTESearchResults
          results={this.results}
          select={this.select}
          dirty={Boolean(this.search.text)}
        />
      </div>
    );
  }
}

export default AdminTESelector;
