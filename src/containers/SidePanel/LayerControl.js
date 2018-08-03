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

  @computed get layerNames() {
    return this.props.store.i18n.layerNames;
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

  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          {this.layerNames.title}
        </h3>
        <div className='layerControl'>
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
        </div>
      </div>
    );
  }
}

export default LayerControl;
