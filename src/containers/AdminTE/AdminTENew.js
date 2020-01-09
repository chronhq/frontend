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
import { computed, action, observable } from 'mobx';
import AdminTESearchBar from '../../components/AdminTESearchBar/AdminTESearchBar';
import TextTopic from './TextTopic';
import AdminTESearchCard from './AdminTECard';


@inject('store')
@observer
class AdminTENew extends React.Component {
  @observable wId = undefined;

  search = action((a) => {
    this.wId = a;
    this.props.store.wikidata.add('country', a);
  })

  select = action(() => {
    this.props.select(undefined, this.data);
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
      stv: 0,
    };
  }

  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  render() {
    return (
      <div className='te-selector'>
        <TextTopic text='1.2 Add new entity' />
        <AdminTESearchBar search={(e) => this.search(e)} />
        {this.data.label !== undefined && (
          <AdminTESearchCard data={this.data} select={() => this.select()} />
        )}
      </div>
    );
  }
}

AdminTENew.propTypes = {
  select: PropTypes.func.isRequired,
};

export default AdminTENew;
