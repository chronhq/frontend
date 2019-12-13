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

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);

const Link = ({
  href, name, setRef, text
}) => (
  <a href={href} target='_blank' rel='noopener noreferrer' ref={(r) => { setRef(name, r); return false; }}>
    {text}
  </a>
);

const LayerToggleButton = ({ click, name, styles = '' }) => (
  <>
    <div />
    <LayerToggle
      key={`layer_${click}`}
      tooltip={capitalizeFirstLetter(name)}
      place=''
      extraClassName={styles}
      checked
      name={name}
      click={() => click(name)}
    />
  </>
);

@inject('store')
@observer
class LayerControlWrapper extends React.Component {
  handleZoom = (data) => {
    const out = Boolean(data.payload.minus);
    this.props.store.deck.zoomOut(out);
  }

  setRef = (name, ref) => {
    this[name] = ref;
  }

  click = (name) => this[name].click();

  render() {
    return (
      <div className='side-bar__grid'>
        <EventsMenu />
        <LayerToggleButton name='admin' click={this.click} />
        <LayerToggleButton name='github' click={this.click} />
        <LayerToggleButton name='discord' click={this.click} />
        <div style={{ visibility: 'hidden' }}>
          <Link href='/admin' name='admin' setRef={this.setRef} text='Link to admin interface' />
          <Link href='https://discord.gg/rN3uen5' name='discord' setRef={this.setRef} text='Link to Discord chat' />
          <Link href='https://github.com/chronhq/' name='github' setRef={this.setRef} text='Link to Github Page' />
        </div>
        <div />
        {['plus', 'minus'].map((z) => (
          <>
            <div />
            <LayerToggle
              key={`layer_${z}`}
              tooltip=''
              place={z}
              name={z}
              checked={false}
              extraClassName={`icon icon-${z}`}
              click={this.handleZoom}
            />
          </>
        ))}
      </div>
    );
  }
}

export default LayerControlWrapper;
