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
import SmoothCollapse from 'react-smooth-collapse';

import AdminWrapper from './AdminWrapper';
import TwoActions from '../../components/TwoActions/TwoActions';
import { CreateActionButton, ChangeActionButton } from '../../components/ActionButtons/ActionButtons';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import Select from '../../components/SlimSelect';

const keyVal = arr => arr.map(a => ({ value: a, label: a }));
@inject('store')
@observer
class AdminTE extends React.Component {
  @observable color = 1;

  @observable adminLevel = { value: 'Country', label: 'Country' };

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
      <AdminWrapper title='Territorial Entity'>
        <p>
          {'Enter wikidata id'}
        </p>
        <Select
          containerWidth='14rem'
          options={keyVal(['Union', 'Country', 'Region'])}
          value={this.teId}
          placeholder='Territorial Entity id'
          onClick={(e) => { this.teId = e; return false; }}
        />
        <span>Label placeholder</span>
        <ChangeActionButton text={this.edit ? 'Cancel' : 'Edit'} click={() => { this.edit = !this.edit; return false; }} />
        <SmoothCollapse expanded={this.edit}>
          <div>
            <p>
              {'Select color'}
            </p>
            <ColorPicker selected={this.color} changeColor={c => this.changeColor(c)} />
            <p>
              {'Select admin level'}
            </p>
            <Select
              containerWidth='14rem'
              options={keyVal(['Union', 'Country', 'Region'])}
              value={this.adminLevel}
              placeholder='Admin Level'
              onClick={(e) => { this.adminLevel = e; return false; }}
            />
            <p>
              {'Predecessor wikidata id'}
            </p>
            <Select
              containerWidth='14rem'
              options={keyVal(['Union', 'Country', 'Region'])}
              value={this.predecessorId}
              placeholder='Predecessor wikidata id'
              onClick={(e) => { this.predecessorId = e; return false; }}
            />
          </div>
        </SmoothCollapse>
        <CreateActionButton text='New' click={() => true} />
        <TwoActions
          left='Delete'
          right='Save'
        />
        <TwoActions
          left='Back'
          leftClick={() => this.props.store.admin.nextScreen('panel')}
        />
      </AdminWrapper>
    );
  }
}

export default AdminTE;
