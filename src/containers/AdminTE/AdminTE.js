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
import { action, computed } from 'mobx';

import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import AdminTESearchResults from './AdminTESearchResults';
import AdminTESearchBar from '../../components/AdminTESearchBar/AdminTESearchBar';
import TextTopic from './TextTopic';
import Spinner from '../../components/Spinner/Spinner';

@inject('store')
@observer
class AdminTE extends React.Component {
  componentDidMount() {
    if (!this.loaded) {
      // TODO Invoke query earlier (on Admin open)
      this.props.store.data.territorialEntities.get();
    }
  }

  @computed get search() {
    return this.props.store.search.TerritorialEntities;
  }

  @computed get loaded() {
    return this.props.store.data.territorialEntities.status.loaded;
  }

  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @action selectTE(data, form) {
    this.form.data.selected = data;
    this.form.data.form = form;
  }

  render() {
    return (
      <AdminWrapper>
        {this.loaded
          ? (
            <div className='te-selector'>
              <TextTopic text='Find territorial entity in the database' />
              <AdminTESearchBar search={(e) => this.search.setText(e)} />
              <AdminTESearchResults />
            </div>
          )
          : <Spinner />}
      </AdminWrapper>
    );
  }
}

export default AdminTE;
