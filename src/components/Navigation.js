import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeScale, rotateProjection, resetRotation } from '../reducers/mapView';
import './Navigation.less';

const VertButton = ({ cb, fa }) => (
  <button
    className='btn btn-default'
    onClick={cb}
  >
    <i className={`fa fa-${fa}`} />
  </button>
);

class Navigation extends Component {
  handleRotation = (step) => {
    this.props.rotateProjection(this.props.rotation + step);
  }

  handleScale = (step) => {
    this.props.changeScale(this.props.scale + step);
  }

  handleReset = () => {
    this.props.resetRotation();
  }
  render() {
    return (
      <div id='navigation' className='btn-group-vertical'>
        <VertButton fa='home' cb={() => this.handleReset()} />
        <hr />
        <VertButton fa='rotate-left' cb={() => this.handleRotation(-15)} />
        <VertButton fa='rotate-right' cb={() => this.handleRotation(15)} />
        <hr />
        <VertButton fa='plus' cb={() => this.handleScale(1)} />
        <VertButton fa='minus' cb={() => this.handleScale(-1)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    scale: state.mapView.scale,
    rotation: state.mapView.rotation
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeScale: bindActionCreators(changeScale, dispatch),
    resetRotation: bindActionCreators(resetRotation, dispatch),
    rotateProjection: bindActionCreators(rotateProjection, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
