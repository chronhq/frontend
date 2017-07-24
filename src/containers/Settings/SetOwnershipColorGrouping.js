import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { InputRange } from '../../components/Input';

import { changeGrouping } from '../../reducers/runtime/landOwnershipColors';

import './SetProjectionContainer.less'; // Styles for Select

class SetOwnershipGrouping extends Component {
  constructor(props) {
    super(props);
    const options = [
      {
        value: 'auto',
        label: 'Auto'
      },
      {
        value: 'on',
        label: 'Always on'
      },
      {
        value: 'off',
        label: 'Always off'
      }
    ];
    const name = this.props.auto === true 
      ? 'auto'
      : (this.props.enabled === true 
          && 'on' || 'off');
    this.state = {
      options,
      name,
      auto: this.props.auto,
      zoomPoint: this.props.zoomPoint,
      enabled: this.props.enabled
    };
  }
  values = {
    auto: { auto: true, enabled: true },
    on: { auto: false, enabled: true },
    off: { auto: false, enabled: false }
  }

  changeAutoGrouping = (data) => {
    const newState = { ...this.state, name: data.value, ...this.values[data.value] };
    this.setState(newState);
    this.props.changeGrouping(newState.auto, newState.enabled, newState.zoomPoint);
  }
  changeZoomPoint = (data) => {
    this.setState({ ...this.state, ...data });
    this.props.changeGrouping(this.state.auto, this.state.enabled, data.zoomPoint);
  }

  render() {
    return (
      <div className='layerControl'>
        <Select
          name='Change grouping'
          value={this.state.name}
          options={this.state.options}
          onChange={this.changeAutoGrouping}
        />
        <br />
        <InputRange
          className='detailSlider'
          name='zoomPoint'
          label='Уровень переключения'
          value={this.state.zoomPoint}
          min='0'
          max='10'
          cb={this.changeZoomPoint}
        />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    auto: state.runtime.landOwnershipColors.auto,
    enabled: state.runtime.landOwnershipColors.enabled,
    zoomPoint: state.runtime.landOwnershipColors.zoomPoint,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeGrouping: bindActionCreators(changeGrouping, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetOwnershipGrouping);