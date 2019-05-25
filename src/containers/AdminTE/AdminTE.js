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
import { observable, action, computed } from 'mobx';

import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import TwoActions from '../../components/TwoActions/TwoActions';
import ActionButton from '../../components/ActionButtons/ActionButtons';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Select from '../../components/SlimSelect';
import AdminTESelector from './AdminTESelector';
import TextTopic from './TextTopic';

import AdminLevels from '../../components/AdminLevels/AdminLevels';
import AdminTESelectedCard from './AdminTESelectedCard';

const keyVal = arr => arr.map(a => ({ value: a, label: a }));
@inject('store')
@observer
class AdminTE extends React.Component {
  @observable color = 1;

  @observable adminLevel = 2;

  @observable teId = undefined;

  @observable edit = false;

  @observable predecessorId = undefined;

  @observable disabled = false;


  componentDidMount() {
    if (!this.loaded) {
      this.props.store.data.territorialEntities.get();
    }
  }

  @computed get loaded() {
    return this.props.store.data.territorialEntities.status.loaded;
  }

  @action changeColor(c) {
    this.color = c;
  }

  render() {
    return (
      <AdminWrapper title='Territorial Entity' back='panel'>
        <AdminTESelector />
        <TextTopic text='2. Check main settings' />
        <AdminTESelectedCard />
        <div>
          <TextTopic text='2.1 Admin level' />
          <AdminLevels
            selected={this.adminLevel}
            select={(e) => { this.adminLevel = e; return false; }}
          />
          <TextTopic text='2.2 Color' />
          <ColorPicker selected={this.color} changeColor={c => this.changeColor(c)} />
          <TextTopic text='Predecessor wikidata id' />
          <Select
            containerWidth='14rem'
            options={keyVal(['Union', 'Country', 'Region'])}
            value={this.predecessorId}
            placeholder='Predecessor wikidata id'
            onClick={(e) => { this.predecessorId = e; return false; }}
          />
        </div>
        <TwoActions>
          <ActionButton text='Delete' icon='delete' />
          <ActionButton text='Save' icon='save' />
        </TwoActions>
      </AdminWrapper>
    );
  }
}

export default AdminTE;
