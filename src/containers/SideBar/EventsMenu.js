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

@inject('store')
@observer
class EventsMenu extends React.Component {
  @observable events = false;

  @computed get msg() {
    return this.props.store.i18n.data;
  }

  @computed get eventsStyle() {
    return {
      visibility: this.events === true ? 'initial' : 'hidden'
    };
  }

  nameToTooltip = (id) => this.msg.layerNames[id];

  handleLayer = (place, layer, status) => {
    this.props.store.flags[place].set(layer, status);
    this.props.store.analytics.metricHit(`main_${layer}`);
  }

  @action toggleEvents = () => {
    this.events = !this.events;
  }

  render() {
    return (
      <>
        <div style={this.eventsStyle} className='side-bar__extra'>
          {Object.keys(dumpData).map((place) => (
            dumpData[place].map((id) => (
              <LayerToggle
                key={`layer_${id}`}
                tooltip={this.nameToTooltip(id)}
                checked={this.props.store.flags[place].list[id]}
                name={id}
                click={(layer, status) => this.handleLayer(place, layer, status)}
              />
            ))))}
        </div>
        <LayerToggle
          key='layer_events'
          tooltip='Events'
          checked={this.events}
          name='events'
          click={this.toggleEvents}
        />
      </>
    );
  }
}

export default EventsMenu;
