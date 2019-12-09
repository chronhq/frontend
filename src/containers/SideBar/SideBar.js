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
import { withRouter } from 'react-router-dom';

import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';

import './SideBar.less';

const dumpData = {
  layer: ['cities'],
  pins: ['persons', 'battle', 'document'],
};

const zoom = ['plus', 'minus'];

@inject('store')
@observer
class LayerControlWrapper extends React.Component {
  @observable events = false;

  @computed get eventsStyle() {
    return {
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

  openAdmin = () => this.props.history.push('/admin');

  openGithub = () => this.github.click();

  openDiscord = () => this.discord.click();

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
          extraClassName='icon icon-magic-wand'
          extraStyle={{ backgroundSize: '80% 80%' }}
          checked={false}
          name='admin'
          click={this.openAdmin}
        />
        <div />
        <LayerToggle
          key='layer_github'
          tooltip='Github'
          place=''
          checked={false}
          name='github'
          click={this.openGithub}
        />
        <div />
        <LayerToggle
          key='layer_discord'
          tooltip='Discord'
          place=''
          extraClassName='icon image-button-discord'
          checked={false}
          name='discord'
          click={this.openDiscord}
        />
        <div style={{ visibility: 'hidden' }}>
          <a href='https://discord.gg/rN3uen5' target='_blank' rel='noopener noreferrer' ref={(r) => { this.discord = r; return false; }}>
            Link to Discord chat
          </a>
          <a href='https://github.com/chronhq/' target='_blank' rel='noopener noreferrer' ref={(r) => { this.github = r; return false; }}>
            Link to Github Page
          </a>
        </div>
        <div />
        {zoom.map((z) => (
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

export default withRouter(LayerControlWrapper);
