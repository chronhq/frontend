import React from 'react';
// import { EventCanvas } from './MapGraph';
import DeckGL, { MapController } from 'deck.gl';

class MapWrapper extends React.Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      // latitude: 37.6173,
      // longitude: 55.7558,
      latitude: 0,
      longitude: 0,
      zoom: 1,
      bearing: 0,
      pitch: 0
    }
  }
  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }
  resize() {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    return (
      <DeckGL
        controller={MapController}
        onViewportChange={v => this.setState({ viewport: v })}
        // viewstate={this.state.viewport}
      />
    );
  }
}

export default MapWrapper;
