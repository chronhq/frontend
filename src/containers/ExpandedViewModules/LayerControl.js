/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { computed, action } from 'mobx';
import { InputCheckBox } from '../../components/Input';

@inject('store')
@observer
class LayerControl extends React.Component {
  @computed get layer() {
    return this.props.store.flags.layer.list;
  }

  @computed get pins() {
    return this.props.store.flags.pins.list;
  }

  @computed get layerNames() {
    return this.props.store.i18n.data.layerNames;
  }

  @action handleData(data, place) {
    Object.keys(data).map((cur) => {
      // this.layer[cur] = data[cur];
      this.props.store.flags[place].set(cur, data[cur]);
      return false;
    });
  }

  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          {this.props.store.i18n.data.tooltips.layers}
        </h3>
        <div className='layerControl'>
          <InputCheckBox
            key={`layer_${this.layerNames.borders}`}
            name='borders'
            label={this.layerNames.borders}
            checked={this.layer.borders}
            cb={e => this.handleData(e, 'layer')}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.cities}`}
            name='cities'
            label={this.layerNames.cities}
            checked={this.layer.cities}
            cb={e => this.handleData(e, 'layer')}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.inventions}`}
            name='inventions'
            label={this.layerNames.inventions}
            checked={this.pins.inventions}
            cb={e => this.handleData(e, 'pins')}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.persons}`}
            name='persons'
            label={this.layerNames.persons}
            checked={this.pins.persons}
            cb={e => this.handleData(e, 'pins')}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.geoEvents}`}
            name='geoEvents'
            label={this.layerNames.geoEvents}
            checked={this.pins.geoEvents}
            cb={e => this.handleData(e, 'pins')}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.traces}`}
            name='traces'
            label={this.layerNames.traces}
            checked={false}
            disabled="disabled"
            cb={e => this.handleData(e, 'layer')}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.wars}`}
            name={this.layer.wars}
            label={this.layerNames.wars}
            checked={false}
            disabled="disabled"
            cb={e => this.handleLayers(e, 'pins')}
          />

        </div>
      </div>
    );
  }
}

export default LayerControl;
