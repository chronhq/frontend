import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, action } from 'mobx';
// import { FancyCheckbox } from '../../components/Input';
import { InputCheckBox } from '../../components/Input';

@inject('store')
@observer
class LayerControl extends React.Component {
  @computed get options() {
    return this.props.store.flags.flags.layer;
  }

  @action handleChange(data) {
    Object.keys(data).map((cur) => {
      this.options[cur] = data[cur];
      return false;
    });
  }

  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          { 'Управление слоями' }
        </h3>
        <div className='layerControl'>
          {
            Object.keys(this.options).map((item, id) => (
              <InputCheckBox
                key={`layer_${id}`}
                name={item}
                label={item}
                checked={this.options[item]}
                cb={e => this.handleChange(e)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default LayerControl;
