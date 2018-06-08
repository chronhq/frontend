import React from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import { InputCheckBox, InputRange } from '../../components/Input';

@inject('store')
@observer
class SetLayerVisibility extends React.Component {
  @action handleChange(data) {
    Object.keys(data).map((cur) => {
      this.props.store.flags.flags.visibility[cur] = data[cur];
      return false;
    });
  }

  render() {
    return (
      <div className='layerControl'>
        <h5> Метки </h5>
        <InputCheckBox
          name='borders'
          label="Границы"
          checked={this.props.store.flags.flags.visibility.borders}
          cb={d => this.handleChange(d)}
        />
        <InputCheckBox
          name='locations'
          label="Города"
          checked={this.props.store.flags.flags.visibility.locations}
          cb={d => this.handleChange(d)}
        />
        <InputCheckBox
          name='tooltips'
          label="Названия"
          checked={this.props.store.flags.flags.visibility.tooltips}
          cb={d => this.handleChange(d)}
        />
        <h5>Детали</h5>
        <InputRange
          className='detailSlider'
          name='scale'
          // label={}
          value={this.props.store.flags.flags.visibility.scale}
          min='0'
          max='10'
          cb={d => this.handleChange(d)}
        />
      </div>
    );
  }
}

export default SetLayerVisibility;
