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
import { computed, action } from 'mobx';
import SmoothCollapse from 'react-smooth-collapse';

import { CreateActionButton } from '../../components/ActionButtons/ActionButtons';
import TextTopic from './TextTopic';

@inject('store')
@observer
class AdminTENew extends React.Component {
  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @action input(a) {
    this.form.data.wikidataId = a.target.value;
  }

  @action show() {
    this.form.data.te = undefined;
    this.form.data.new = true;
  }

  render() {
    return this.form.data.search ? (
      <div className='te-selector'>
        <TextTopic text='1.2 Add new entity' />
        <CreateActionButton text='New' click={() => this.show()} />
        <SmoothCollapse expanded={this.form.data.new}>
          <div className='te-selector__search'>
            <input type='search' value={this.form.data.wikidataId} onChange={e => this.input(e)} />
          </div>
        </SmoothCollapse>
      </div>
    ) : null;
  }
}

export default AdminTENew;
