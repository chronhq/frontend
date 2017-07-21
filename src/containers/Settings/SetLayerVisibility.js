import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { InputCheckBox, InputRange } from '../../components/Input';
import { setVisibility } from '../../reducers/runtime/visibility';

class SetLayerVisibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borders: this.props.borders,
      locations: this.props.locations,
      tooltips: this.props.tooltips,
      scale: this.props.scale
    };
  }
  handleChange = (data) => {
    this.setState({ ...this.state, ...data });
    this.props.setVisibilityAction({ ...this.state, ...data });
  }
  render() {
    return (
      <div className='layerControl'>
        <InputCheckBox
          name='borders'
          label="Границы"
          checked={this.state.borders}
          cb={this.handleChange}
        />
        <InputCheckBox
          name='locations'
          label="Города"
          checked={this.state.locations}
          cb={this.handleChange}
        />
        <InputCheckBox
          name='tooltips'
          label="Названия"
          checked={this.state.tooltips}
          cb={this.handleChange}
        />
        <br />
        <InputRange
          className='detailSlider'
          name='scale'
          label='Детали'
          value={this.state.scale}
          min='0'
          max='10'
          cb={this.handleChange}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    borders: state.runtime.visibility.borders,
    locations: state.runtime.visibility.locations,
    tooltips: state.runtime.visibility.tooltips,
    scale: state.runtime.visibility.scale,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setVisibilityAction: bindActionCreators(setVisibility, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetLayerVisibility);
