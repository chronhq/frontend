import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputCheckBox from '../components/InputCheckBox';
import { setVisibility } from '../reducers/visibility';

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
      <div>
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
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    borders: state.visibility.borders,
    locations: state.visibility.locations,
    tooltips: state.visibility.tooltips,
    scale: state.visibility.scale,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setVisibilityAction: bindActionCreators(setVisibility, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetLayerVisibility);
