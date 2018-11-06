import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, action } from 'mobx';
import { InputCheckBox } from '../../components/Input';

@inject('store')
@observer
class LayerControl extends React.Component {
  @computed get layer() {
    return this.props.store.flags.flags.layer;
  }

  @computed get pins() {
    return this.props.store.flags.flags.pins;
  }

  @computed get upcominglayer() {
    return this.props.store.flags.flags.upcominglayer;
  }

  @computed get layerNames() {
    return this.props.store.i18n.data.layerNames;
  }

  @action handleLayers(data) {
    Object.keys(data).map((cur) => {
      this.layer[cur] = data[cur];
      return false;
    });
  }

  @action handlePins(data) {
    Object.keys(data).map((cur) => {
      this.pins[cur] = data[cur];
      return false;
    });
  }

  @action handleCities(data) {
    Object.keys(data).map((cur) => {
      this.layer[cur] = data[cur];
      this.layer.labels = data[cur];
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
          {/*
          {
            Object.keys(this.layer).map(item => (
              <InputCheckBox
                key={`layer_${item}`}
                name={item}
                label={this.layerNames[item]}
                checked={this.layer[item]}
                cb={e => this.handleLayers(e)}
              />
            ))
          }
          {
            Object.keys(this.pins).map(item => (
              <InputCheckBox
                key={`layer_${item}`}
                name={item}
                label={this.layerNames[item]}
                checked={this.pins[item]}
                cb={e => this.handlePins(e)}
              />
            ))
          }
          */}
          <InputCheckBox
            key={`layer_${this.layerNames.borders}`}
            name='borders'
            label={this.layerNames.borders}
            checked={this.layer.borders}
            cb={e => this.handleLayers(e)}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.cities}`}
            name='cities'
            label={this.layerNames.cities}
            checked={this.layer.cities}
            cb={e => this.handleCities(e)}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.inventions}`}
            name='inventions'
            label={this.layerNames.inventions}
            checked={this.pins.inventions}
            cb={e => this.handlePins(e)}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.persons}`}
            name='persons'
            label={this.layerNames.persons}
            checked={this.pins.persons}
            cb={e => this.handlePins(e)}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.geoEvents}`}
            name='geoEvents'
            label={this.layerNames.geoEvents}
            checked={this.pins.geoEvents}
            cb={e => this.handlePins(e)}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.traces}`}
            name='traces'
            label={this.layerNames.traces}
            checked={false}
            disabled="disabled"
            cb={e => this.handleLayers(e)}
          />
          <InputCheckBox
            key={`layer_${this.layerNames.wars}`}
            name={this.layer.wars}
            label={this.layerNames.wars}
            checked={false}
            disabled="disabled"
            cb={e => this.handleLayers(e)}
          />

        </div>
      </div>
    );
  }
}

export default LayerControl;
