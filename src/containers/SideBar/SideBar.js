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

import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';

import './SideBar.less';
import EventsMenu from './EventsMenu';
import HiddenURLButton from './HiddenURLButton';

@inject('store')
@observer
class SideBar extends React.Component {
  handleZoom = (layer) => this.props.store.deck.zoomOut(layer === 'minus');

  render() {
    return (
      <div className='side-bar__grid'>
        <EventsMenu />
        <HiddenURLButton name='admin' styles='menu-admin' href='/admin' />
        <HiddenURLButton name='github' styles='menu-github' href='https://github.com/chronhq/' />
        <HiddenURLButton name='discord' styles='menu-discord' href='https://discord.gg/rN3uen5' />
        <div />
        {['plus', 'minus'].map((z) => (
          <LayerToggle
            key={`layer_${z}`}
            tooltip=''
            name={z}
            extraClassName={`icon icon-${z}`}
            click={this.handleZoom}
          />
        ))}
      </div>
    );
  }
}

export default SideBar;
