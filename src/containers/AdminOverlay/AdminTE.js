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

import AdminWrapper from './AdminWrapper';
import TwoActions from '../../components/TwoActions/TwoActions';
import { CreateActionButton } from '../../components/ActionButtons/ActionButtons';
import ColorPicker from './ColorPicker';
import { InputSelect } from '../../components/Input';

const keyVal = arr => arr.map(a => ({ key: a, value: a }));
@inject('store')
@observer
class AdminTE extends React.Component {
  @observable color = 1;

  @observable value = '';

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
      <AdminWrapper title='Territorial Entity'>
        <p>
          {'Select color'}
        </p>
        <p>
          {'Set up political relations'}
        </p>
        <ColorPicker selected={this.color} changeColor={c => this.changeColor(c)} />
        <InputSelect
          options={keyVal(['one', 'two', 'sadf', 'sdfdd', 'dfsd'])}
          value={this.value}
          placeholder='select'
          cb={(e) => { this.value = e; return false; }}
        />
        <CreateActionButton text='New' click={() => true} />
        <TwoActions
          left='Back'
          leftClick={() => this.props.store.admin.nextScreen('panel')}
          right='Save'
        />
        <TwoActions
          left='Delete'
          right='Continue to STV'
          rightClick={() => this.props.store.admin.nextScreen('stv')}
          rightIsLonger
        />
      </AdminWrapper>
    );
  }
}

export default AdminTE;