import React from 'react';
import DeckGL, {
  MapController,
  WebMercatorViewport,
  GeoJsonLayer,
  TextLayer,
  IconLayer
} from 'deck.gl';

import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import mapDecorAtlas from './geoAssets/map-decor.png';
import mapDecorMAPPING from './geoAssets/map-decor.json';

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
    window.addEventListener('resize', () => this.resize(), false);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize(), false);
  }
  onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  @computed get terrain() {
    return Object.values(this.props.store.borders.contour);
  }
  @computed get labels() {
    return Object.values(this.props.store.prepared.labels);
  }
  @computed get visible() {
    return this.props.store.flags.flags.visibility.borders;
  }
  @computed get options() {
    return this.props.store.flags.flags.layer;
  }
  @computed get decorations() {
    return Object.values(this.props.store.prepared.decorations);
  }
  @computed get borders() {
    const rgbColor = (pid) => {
      // const hex = getFillPatternId(props);
      const props = this.props.store.data.Properties.data[pid];
      const hex = props.color || '#d34df0';
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : [13, 244, 61]; // #0df43d
    };
    return !this.visible
      ? []
      :
      this.props.store.borders.bordersPath.map(cur => ({
        geometry: cur.geo.geometry,
        color: rgbColor(cur.props),
        id: cur.id,
        props: cur.props,
      }));
  }

  resize() {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }


  render() {
    const viewport = new WebMercatorViewport({ ...this.state.viewport });
    const opColor = (f, op) => (f.color || f.feature.color).concat(op);
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
        getLineColor: () => [128, 128, 128],
        getFillColor: () => [234, 234, 234],
        stroked: true,
        extruded: false
      }),
      new GeoJsonLayer({
        id: 'borders-layer',
        data: this.borders,
        visible: this.options.borders,
        filled: true,
        pickable: true,
        wireframe: false,
        width: 0.1,
        lineWidthMinPixels: 0.5,
        getLineColor: f => opColor(f, 255),
        getFillColor: f => opColor(f, 208),
        stroked: true,
        extruded: false,
        lineJointRounded: true
      }),
      new TextLayer({
        id: 'label-layer',
        data: this.labels,
        pickable: true,
        visible: this.options.labels,
        getText: d => d.data.string.en,
        getPosition: d => [d.point.x, d.point.y],
        getSize: 32,
        sizeScale: 1,
        getTextAnchor: 'middle',
        fontFamily: 'OpenSans-Light',
        getAlignmentBaseline: 'center'
      }),
      new IconLayer({
        id: 'map-decoration-layer',
        data: this.decorations,
        visible: this.options.mapDecorations,
        pickable: true,
        iconAtlas: mapDecorAtlas,
        iconMapping: mapDecorMAPPING,
        sizeScale: 15,
        getPosition: d => [d.point.x, d.point.y],
        getIcon: () => 'marker',
        getSize: () => 5,
        getColor: () => [66, 66, 66]
      })
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
