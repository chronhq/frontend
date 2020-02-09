/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import './DashboardSearch.less';

@inject('store')
@observer
class DashboardSearch extends React.Component {
  setText = (e) => {
    this.props.store.search.filter.setText(e.target.value);
  }

  render() {
    return (
      <input
        className='float-container icon--input icon-search--blue dashboard-search input-text'
        type='text'
        value={this.props.store.search.filter.text}
        onChange={this.setText}
        onBlur={() => {
          if (this.props.store.search.filter.text.length > 0) {
            this.props.store.analytics.metricHit('main_search');
          }
          return true;
        }}
      />
    );
  }
}

export default DashboardSearch;
