import React from 'react';
import DeckGL, { MapController, GeoJsonLayer, WebMercatorViewport } from 'deck.gl';
// import DeckGLLayers from './Layers';

import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class MapWrapper extends React.Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: 0,
      latitude: 0,
      zoom: 1,
      bearing: 0,
      pitch: 0
    },
  }
  componentDidMount() {
    // fetch('http://enjalot.github.io/wwsd/data/world/world-110m.geojson')
    //   .then(response => {
    //     if (response.status !== 200) {
    //       console.log(`There was a problem: ${response.status}`);
    //       return;
    //     }
    //     response.json().then(data => {
    //       this.setState({ data: data });
    //     });
    //   });
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
  @computed get terrain() {
    return Object.values(this.props.store.borders.contour);
  }
  resize() {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }


  render() {
    const viewport = new WebMercatorViewport({ ...this.state.viewport });
    const layers = [
      new GeoJsonLayer({
        id: 'land-contour',
        data: this.terrain,
        visible: true,
        filled: true,
        pickable: true,
        wireframe: true,
        width: 0.1,
        lineWidthMinPixels: 0.5,
        getLineColor: f => [128, 128, 128],
        getFillColor: f => [234, 234, 234],
        stroked: true,
        extruded: false
      }),
    ];
    return (
      <DeckGL
        controller={MapController}
        // views={[viewport]}
        // viewstate={this.state.viewport}
        initialViewState={viewport}
        onViewportChange={v => this.setState({ viewport: v })}
        layers={layers}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export default MapWrapper;
