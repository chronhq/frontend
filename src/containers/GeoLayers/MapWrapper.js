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

import mapDecorAtlas from './geoAssets/test.png';
import mapDecorMAPPING from './geoAssets/test.json';

const charsRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];

const charsEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const special = ['-', ',', '.', '+', '=', '_', '?', ':', '"', '\'', '[', ']', '{', '}', '/', '|', '\\'];

const chars = [
  ...charsRu, ...charsRu.map(c => c.toUpperCase()),
  ...charsEn, ...charsEn.map(c => c.toUpperCase()),
  ...special,
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
  @computed get cities() {
    return this.props.store.prepared.locations;
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
        getText: d => d.data.string.en,
        getPosition: d => [d.point.x, d.point.y],
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
        id: 'map-decoration-layer',
        data: this.decorations,
        visible: this.options.mapDecorations,
        pickable: true,
        iconAtlas: mapDecorAtlas,
        iconMapping: mapDecorMAPPING,
        sizeScale: 15,
        getPosition: d => [d.point.x, d.point.y],
        getIcon: d => `marker-${d.data.picId}`,
        getSize: () => 5,
        getColor: () => [66, 66, 66]
      }),
      new PathLayer({
        id: 'static-traces-layer',
        data: this.traces,
        visible: this.options.traces,
        getPath: (d) => d.data.path[0].path,
        getColor: () => [65, 140, 171],
        getWidth: () => 5,
        rounded: true,
        widthScale: 3,
        widthMinPixels: 2,
        getDashArray: (d) => [10, 10],
        onClick: d => console.log(d.data.id),
      }),
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
