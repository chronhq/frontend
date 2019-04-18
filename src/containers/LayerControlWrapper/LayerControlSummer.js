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
import { computed } from 'mobx';

import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';

// dumbData object contains desciption of used layers and pins for eohd2018-mvp-chron project.
// #HARDCODE #TODO
const dumpData = {
  layer: ['borders', 'cities'],
  pins: ['persons', 'battle', 'document'],
};

@inject('store')
@observer
class LayerControlWrapper extends React.Component {
  @computed get msg() {
    return this.props.store.i18n.data;
  }

  nameToTooltip = id => this.msg.layerNames[id];

  handleLayer = (data) => {
    Object.keys(data.payload).map((cur) => {
      this.props.store.flags[data.place].set(cur, data.payload[cur]);
      this.props.store.analytics.metricHit(`main_${cur}`);
      return false;
    });
  }

  render() {
    return (
      <React.Fragment>
        {Object.keys(dumpData).map(place => (
          dumpData[place].map(id => (
            <LayerToggle
              key={`layer_${id}`}
              tooltip={this.nameToTooltip(id)}
              place={place}
              checked={this.props.store.flags[place].list[id]}
              name={id}
              click={this.handleLayer}
            />
          ))
        ))}
      </React.Fragment>
    );
  }
}

export default LayerControlWrapper;
