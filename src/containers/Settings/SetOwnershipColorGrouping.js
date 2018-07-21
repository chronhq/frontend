import React from 'react';
import { observer, inject } from 'mobx-react';
import { InputRange, InputSelect } from '../../components/Input';

import './SetProjectionContainer.less'; // Styles for Select

@inject('store')
@observer
class SetOwnershipGrouping extends React.Component {
  changeAutoGrouping = (data) => {
    this.props.store.colors.selectMode(data.value);
  }

  changeZoomPoint = (data) => {
    this.props.store.colors.zoomPoint = data.zoomPoint;
  }

  render() {
    const options = JSON.parse(JSON.stringify(this.props.store.colors.options));

    return (
      <div className='layerControl'>
        <h5>
          { ' Группировка территорий ' }
        </h5>
        <InputSelect
          name='Change grouping'
          value={this.props.store.colors.value}
          options={options}
          onChange={this.changeAutoGrouping}
        />
        <br />
        <InputRange
          className='detailSlider'
          name='zoomPoint'
          value={this.props.store.colors.zoomPoint}
          min='0'
          max='10'
          cb={this.changeZoomPoint}
        />
      </div>
    );
  }
}

export default SetOwnershipGrouping;
