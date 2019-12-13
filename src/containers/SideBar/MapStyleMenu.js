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

import ModalWrapper from '../../components/ModalWrapper';
import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';
import TwoActions from '../../components/TwoActions/TwoActions';
import ActionButton from '../../components/ActionButtons/ActionButtons';

const Input = ({
  label, value, setText, valid, placeholder
}) => (
  <label className='tooltip-author' htmlFor='token'>
    <div className='tooltip-author'>{label}</div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <input
        className='text-input'
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={setText}
      />
      <div
        className={`icon ${valid ? 'icon-checkmark-circle' : 'icon-cross-circle'}`}
        style={{
          width: '1rem',
          height: '1rem',
          display: value === '' ? 'initial' : 'hidden',
          paddingLeft: '1rem',
        }}
      />
    </div>
  </label>
);

@inject('store')
@observer
class MapStyleMenu extends React.Component {
  @observable menu = false;

  @observable token = '';

  @observable style = '';

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

  @computed get menuStyle() {
    return {
      visibility: this.menu === true ? 'initial' : 'hidden'
    };
  }

  @action toggleMenu = () => {
    this.menu = !this.menu;
  }

  @action setText = (type, text) => {
    this[type] = text;
  }

  @action save = () => {
    if (this.valid) {
      this.props.store.mapStyle.setUpConfig({ token: this.token, style: this.style });
    }
  }

  @action clean = () => {
    this.props.store.mapStyle.setUpConfig();
  }

  render() {
    return (
      <LayerToggle
        key='layer_map'
        tooltip='Map'
        extraClassName='menu-map'
        name='map'
        click={this.toggleMenu}
      >
        <ModalWrapper close={this.toggleMenu} isOpen={this.menu}>
          <div style={this.menuStyle} className='float-container side-bar__extra side-bar__extra--menu'>
            <div className='text__narrative--body'>
              Try your mapbox styled design by uploading it here.
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
              <ActionButton text='Save' icon='save' click={this.save} enabled={this.valid} />
              <ActionButton text='Defaults' icon='redo' click={this.clean} />
            </TwoActions>
          </div>
        </ModalWrapper>
      </LayerToggle>
    );
  }
}

export default MapStyleMenu;
