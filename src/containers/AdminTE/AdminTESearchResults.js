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

import { observer, inject, PropTypes as PropTypesMobx } from 'mobx-react';
import { computed } from 'mobx';

import AdminTESearchCard from './AdminTESearchCard';

@inject('store')
@observer
class AdminTESearchResults extends React.Component {
  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get empty() {
    return this.props.dirty ? 'No results' : '';
  }


  render() {
    return (
      <div className='te-selector__results'>
        {this.props.results.length > 0
          ? this.props.results.map((c) => (
            <AdminTESearchCard key={`sc_${c}`} te={c} select={() => this.props.select(c)} />
          ))
          : this.empty}
      </div>
    );
  }
}

AdminTESearchResults.defaultProps = {
  results: [],
  dirty: false,
};

AdminTESearchResults.propTypes = {
  results: PropTypesMobx.observableArray,
  dirty: PropTypes.bool,
};

export default AdminTESearchResults;
