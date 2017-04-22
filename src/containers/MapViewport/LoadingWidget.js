import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoadingStatus extends Component {
  state = {
    loaded: true
  }
  componentWillReceiveProps(nextProps) {
    const loaded = Object.keys(nextProps.current).reduce((prev, curId) => (
      prev !== false
        ? nextProps.current[curId].geo in nextProps.borders
        : false
    ), true);
    this.setState({ loaded });
  }
  render() {
    return (<text stroke='transparent' >{(this.state.loaded) ? 'Карты загружены' : 'Загружаем карты'}</text>);
  }
}

function mapStateToProps(state) {
  return {
    borders: state.borders.byId,
    current: state.timeline.borders.current,
    activeLoading: state.timeline.borders.loading
  };
}
const LoadingStatusConnected = connect(mapStateToProps)(LoadingStatus);


const LoadingWidget = ({ height = 0 }) => (
  <g className='sizeMeter' transform={`translate(0,-40)`} strokeWidth="1" stroke='black' >
    <LoadingStatusConnected />
  </g>
);
export default LoadingWidget;
