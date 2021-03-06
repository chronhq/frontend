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
import { computed, observable, action } from 'mobx';

import TwoActions from '../../components/TwoActions/TwoActions';
import ActionButton from '../../components/ActionButtons/ActionButtons';
import ExtraSideMenu from './ExtraSideMenu';

const inputClass = 'text-input icon--input dashboard-search input-text';

const Input = ({
  label, value, setText, valid, placeholder
}) => (
  <label className='tooltip-author' htmlFor='token'>
    <div className='tooltip-author'>{label}</div>
    <input
      className={`${inputClass} ${valid ? 'icon-checkmark-circle' : 'icon-cross-circle'}`}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={setText}
    />
  </label>
);

@inject('store')
@observer
class MapStyleMenu extends React.Component {
  @observable token = '';

  @observable style = '';

  setText = action((type, text) => {
    this[type] = text;
  })

  save = action(() => {
    if (this.valid) {
      this.props.store.mapStyle.setUpConfig({ token: this.token, style: this.style });
    }
  })

  clean = action(() => {
    this.props.store.mapStyle.setUpConfig();
  })

  @computed get valid() {
    return (this.styleIsValid && this.tokenIsValid);
  }

  @computed get tokenIsValid() {
    return (
      this.token.length > 64
      && this.token.length < 128
      && !this.token.match(/\s/)
    );
  }

  @computed get styleIsValid() {
    return (
      this.style.length > 40
      && Boolean(this.style.match(/^mapbox:\/\/styles\//))
    );
  }

  render() {
    return (
      <ExtraSideMenu
        key='layer_map'
        tooltip='Map'
        extraClassName='menu-map'
        wrapper='side-bar__desktop'
        name='map'
      >
        <div style={{ display: 'flex', minHeight: '2rem' }}>
          <div className='text__narrative--body'>
            Try your mapbox styled design by uploading it here.
          </div>
        </div>
        <div className='text__narrative--menu'>
          The style will only be applied for one session.
          To make your style permanent please ask for instructions in Discord.
        </div>
        <Input
          label='Style link'
          setText={(e) => this.setText('style', e.target.value)}
          value={this.style}
          valid={this.styleIsValid}
          placeholder='mapbox://styles/...'
        />
        <Input
          label='Access token'
          setText={(e) => this.setText('token', e.target.value)}
          value={this.token}
          valid={this.tokenIsValid}
          placeholder='pk.eyJ1IjoibWlrbGVyZ20...'
        />
        <TwoActions>
          <ActionButton text='Reset' icon='recycle' click={this.clean} />
          <ActionButton text='Save' icon='save' click={this.save} enabled={this.valid} />
        </TwoActions>
      </ExtraSideMenu>
    );
  }
}

export default MapStyleMenu;
