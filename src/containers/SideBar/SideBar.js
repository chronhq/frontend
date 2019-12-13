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

import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';

import './SideBar.less';

const dumpData = {
  layer: ['cities'],
  pins: ['persons', 'battle', 'document'],
};

const Link = ({
  href, name, setRef, text
}) => (
  <a href={href} target='_blank' rel='noopener noreferrer' ref={(r) => { setRef(name, r); return false; }}>
    {text}
  </a>
);

@inject('store')
@observer
class LayerControlWrapper extends React.Component {
  @observable events = false;

  @computed get eventsStyle() {
    return {
      justifyContent: 'flex-end',
      width: '100%',
      display: 'flex',
      visibility: this.events === true ? 'initial' : 'hidden'
    };
  }

  @computed get msg() {
    return this.props.store.i18n.data;
  }

  nameToTooltip = (id) => this.msg.layerNames[id];

  handleLayer = (data) => {
    Object.keys(data.payload).map((cur) => {
      this.props.store.flags[data.place].set(cur, data.payload[cur]);
      this.props.store.analytics.metricHit(`main_${cur}`);
      return false;
    });
  }

  handleZoom = (data) => {
    const out = Boolean(data.payload.minus);
    this.props.store.deck.zoomOut(out);
  }

  setRef = (name, ref) => {
    this[name] = ref;
  }

  click = (name) => this[name].click();

  @action toggleEvents = () => {
    this.events = !this.events;
  }

  render() {
    return (
      <div className='side-bar__grid'>
        <div style={this.eventsStyle}>
          {Object.keys(dumpData).map((place) => (
            dumpData[place].map((id) => (
              <LayerToggle
                key={`layer_${id}`}
                tooltip={this.nameToTooltip(id)}
                place={place}
                checked={this.props.store.flags[place].list[id]}
                name={id}
                click={this.handleLayer}
              />
            ))))}
        </div>
        <LayerToggle
          key='layer_events'
          tooltip='Events'
          place=''
          checked={false}
          name='events'
          click={this.toggleEvents}
        />
        <div />
        <LayerToggle
          key='layer_admin'
          tooltip='Admin'
          place=''
          // extraClassName='icon icon-magic-wand'
          checked={false}
          name='admin'
          click={() => this.click('admin')}
        />
        <div />
        <LayerToggle
          key='layer_github'
          tooltip='Github'
          place=''
          checked={false}
          name='github'
          click={() => this.click('github')}
        />
        <div />
        <LayerToggle
          key='layer_discord'
          tooltip='Discord'
          place=''
          extraStyle={{ backgroundSize: '90% 90%' }}
          checked={false}
          name='discord'
          click={() => this.click('discord')}
        />
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
