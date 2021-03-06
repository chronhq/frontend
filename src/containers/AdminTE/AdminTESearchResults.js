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
import { withRouter } from 'react-router-dom';

import AdminTECard from './AdminTECard';

@inject('store')
@observer
class AdminTESearchResults extends React.Component {
  @computed get search() {
    return this.props.store.search.TerritorialEntities;
  }

  @computed get results() {
    return Object.keys(this.search.filtered).sort((a, b) => Number(a) > Number(b));
  }

  @computed get empty() {
    return this.search.text ? 'No results' : '';
  }


  render() {
    return (
      <div className='te-selector__results'>
        {this.results.length > 0
          ? this.results.map((c) => (
            <AdminTECard key={`sc_${c}`} te={c} select={() => this.props.history.push(`/admin/te/${c}`)} />
          ))
          : this.empty}
      </div>
    );
  }
}

export default withRouter(AdminTESearchResults);
