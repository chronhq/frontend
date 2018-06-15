import React from 'react';
import DeckGL, {
  MapController,
  GeoJsonLayer,
  TextLayer,
  IconLayer,
  PathLayer
} from 'deck.gl';

import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';

import mapDecorAtlas from './geoAssets/map-decoration.png';
import mapDecorMAPPING from './geoAssets/map-decoration.json';

import testingAtlas from './geoAssets/location-icon.png';
import testingMapping from './geoAssets/location-icon.json';

import TripsLayer from './trips-layer';

const charsRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];

const charsEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const special = ['-', ',', '.', '+', '=', '_', '?', ':', '"', '\'', '[', ']', '{', '}', '/', '|', '\\', ' ', '(', ')'];

const chars = [
  ...charsRu, ...charsRu.map(c => c.toUpperCase()),
  ...charsEn, ...charsEn.map(c => c.toUpperCase()),
  ...special,
];

const testData = [
  {coord: [0, 0], icon: 'marker-1', size: 30},
  {coord: [0, 0], icon: 'marker-2', size: 5}
];

@inject('store')
@observer
class MapWrapper extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize(), false);
  }
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  @computed get terrain() {
    return Object.values(this.props.store.borders.contour);
  }
  @computed get labels() {
    return Object.values(this.props.store.data.MapLabels.data).map(cur => ({
      ...cur,
      string: cur.string[this.lng],
    }));
  }
  @computed get visible() {
    return this.props.store.flags.flags.visibility.borders;
  }
  @computed get options() {
    return this.props.store.flags.flags.layer;
  }
  @computed get decorations() {
    return Object.values(this.props.store.data.MapDecorations.data);
  }
  @computed get cities() {
    return this.props.store.prepared.clusteredLocations;
  }
  @computed get traces() {
    return this.props.store.prepared.expeditions;
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
  @observable width = window.innerWidth
  @observable height = window.innerHeight

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  render() {
    const opColor = (f, op) => (f.color || f.feature.color).concat(op);
    const ICON_SIZE = 60;

    // cluster thing
    // const showCluster = this.props.store.flags.flags.runtime.cluster;
    const showCluster = true;
    const z = Math.floor(this.props.store.deck.zoom);
    const size = showCluster ? 1 : Math.min(Math.pow(1.5, this.props.store.deck.zoom - 10), 1);
    const updateTrigger = z * showCluster;

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
        pickable: false,
        visible: this.options.labels,
        getText: d => d.string,
        getPosition: d => [d.geopoint[0], d.geopoint[1]],
        getSize: 32,
        sizeScale: 1,
        getTextAnchor: 'middle',
        fontFamily: 'OpenSans-Light',
        characterSet: chars,
        getAlignmentBaseline: 'center'
      }),
      new TextLayer({
        id: 'cities-layer',
        data: this.cities,
        pickable: true,
        visible: this.options.cities,
        getText: d => d.name,
        getPosition: d => [d.x, d.y],
        getSize: 32,
        sizeScale: 1,
        getTextAnchor: 'middle',
        fontFamily: 'OpenSans-Light',
        characterSet: chars,
        getAlignmentBaseline: 'center'
      }),
      new IconLayer({
        id: 'city-points-layer',
        data: this.cities,
        // visible: this.options.cities,
        visible: true,
        pickable: true,
        iconAtlas: testingAtlas,
        iconMapping: testingMapping,
        // sizeScale: ICON_SIZE * size * window.devicePixelRatio,
        sizeScale: 4*size*window.devicePixelRatio,
        getPosition: d => [d.x, d.y],
        getIcon: d => (showCluster ? d.zoomLevels[z] && d.zoomLevels[z].icon : 'marker'),
        getSize: d => (showCluster ? d.zoomLevels[z] && d.zoomLevels[z].size : 1),
        updateTriggers: {
          getIcon: updateTrigger,
          getSize: updateTrigger
        },
        onClick: d => console.log('info:', d)
      }),
      new IconLayer({
        id: 'map-decoration-layer',
        data: this.decorations,
        visible: this.options.mapDecorations,
        pickable: true,
        iconAtlas: mapDecorAtlas,
        iconMapping: mapDecorMAPPING,
        getAngle: d => d.transform.rotate,
        sizeScale: 3,
        getSize: d => (this.props.store.deck.zoom * d.transform.scale),
        getPosition: d => [d.geopoint[0], d.geopoint[1]],
        getIcon: d => `marker-${d.picId}`,
        getColor: () => [66, 66, 66],
        updateTriggers: {
          getSize: this.props.store.deck.zoom,
        },
      }),
      new PathLayer({
        id: 'static-traces-layer',
        data: this.traces,
        visible: this.options.traces && !this.props.store.flags.flags.runtime.animation,
        getPath: d => d.data.path[0].path,
        getColor: () => [65, 140, 171],
        getWidth: () => 5,
        rounded: true,
        widthScale: 3,
        widthMinPixels: 2,
        getDashArray: () => [10, 10],
        // onClick: d => console.log(d.data.id),
      }),
      new TripsLayer({
        id: 'animated-trace-layer',
        data: this.traces,
        visible: this.options.traces && this.props.store.flags.flags.runtime.animation,
        getPath: d => d.timedTraces,
        getColor: () => [65, 140, 171],
        opacity: 1,
        strokeWidth: 10,
        trailLength: 180,
        currentTime: this.props.store.animation.time
      }),
      new IconLayer({
        id: 'test-layer',
        data: testData,
        visible: true,
        pickable: false,
        iconAtlas: testingAtlas,
        iconMapping: testingMapping,
        sizeScale: 3,
        getSize: (d) => d.size,
        getPosition: d => d.coord,
        getIcon: d => d.icon,
        getColor: () => [66, 66, 66],
      })
    ];
    return (
      <DeckGL
        controller={MapController}
        // views={[viewport]}
        // viewstate={this.state.viewport}
        initialViewState={this.props.store.deck.viewport}
        onViewportChange={v => this.props.store.deck.updateViewport(v)}
        layers={layers}
        width={this.width}
        height={this.height}
      />
    );
  }
}

export default MapWrapper;
