import React from 'react';
import DeckGL, {
  MapController,
  TextLayer,
  IconLayer,
  PathLayer
} from 'deck.gl';

import { observer, inject } from 'mobx-react';
import {
  computed, observable, action, toJS
} from 'mobx';

import bordersLayer from './Layers/BordersLayer';
import contourLayer from './Layers/ContourLayer';
import toponymsLayer from './Layers/ToponymsLayer';

import chars from './Layers/VisibleCharacters';

import testingAtlas from './geoAssets/cities2.svg';
import testingMapping from './geoAssets/cities2.json';

import TripsLayer from './trips-layer';

const testData = [
  { coord: [0, 0], icon: 'marker-1', size: 30 },
  { coord: [0, 0], icon: 'marker-2', size: 5 }
];

@inject('store')
@observer
class MapWrapper extends React.Component {
  @observable showCluster = true;

  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize(), false);
  }

  @computed get terrain() {
    const terrain = Object.values(this.props.store.borders.contour);
    return contourLayer(terrain);
  }

  @computed get visible() {
    return this.props.store.flags.flags.visibility.borders;
  }

  @computed get options() {
    return this.props.store.flags.flags.layer;
  }

  @computed get decorations() {
    const decor = [];
    Object.values(this.props.store.data.MapDecorations.data).map((d) => {
      const x = d.geopoint[0];
      const y = d.geopoint[1];
      if (this.props.store.projection.inTheBox(x, y)) {
        decor.push(d);
      }
      return false;
    });
    return decor;
  }

  @computed get cities() {
    return this.props.store.prepared.clusteredLocations;
  }

  @computed get traces() {
    return this.props.store.prepared.expeditions;
  }

  @computed get borders() {
    const properties = this.props.store.data.Properties.data;

    const admins = this.props.store.data.Admins.data;
    const types = this.props.store.data.Types.data;
    const colors = this.props.store.data.MapColors.data;

    const borders = this.props.store.borders.bordersPath;
    const visible = this.options.borders;
    const showInfo = (clickInfo) => {
      if (process.env.NODE_ENV === 'production') {
        return '';
      }
      const propId = clickInfo.object.props;
      const props = properties[propId];
      const admin = admins[props.admin];
      const type = types[props.type];

      console.group();
      console.info('Border click info', clickInfo, props);
      console.group();
      console.info('Props ID:', props.id);
      console.info('Color:', props.color, 'Disputed:', props.disputed);
      console.info('Name:', props.name);
      console.info('NameRu:', props.nameru);
      console.info('wikipedia:', props.wikipedia);
      console.groupEnd();

      console.group();
      console.info('Admin ID:', admin.id);
      console.info('En:', admin.en);
      console.info('Ru:', admin.ru);
      console.groupEnd();

      console.group();
      console.info('Type ID:', type.id);
      console.info('En:', type.en);
      console.info('Ru:', type.ru);
      console.info('Orig:', type.orig);
      console.groupEnd();
      console.groupEnd();
      return null;
    };
    const hoverCb = (d) => {
      // if image contains transparent parts disable drawing tooltip
      const key = d.color === null ? null : d.object.props;
      this.props.store.pins.setCountryActive(key);
      this.props.store.pins.setPosition(d.x, d.y);
    };
    return bordersLayer(borders, properties, colors, visible, showInfo, hoverCb);
  }

  @computed get toponyms() {
    return toponymsLayer(this.props.store.prepared.toponyms, this.options.labels);
  }

  @computed get size() {
    return this.showCluster
      ? 1
      : Math.min(1.5 ** (this.props.store.deck.zoom - 10), 1);
  }

  @computed get cityPoints() {
    const z = this.props.store.deck.rZoom;
    return new IconLayer({
      id: 'city-points-layer',
      data: this.cities,
      // visible: this.options.cities,
      visible: true,
      pickable: true,
      iconAtlas: testingAtlas,
      iconMapping: testingMapping,
      // sizeScale: ICON_SIZE * size * window.devicePixelRatio,
      sizeScale: this.size * window.devicePixelRatio,
      getPosition: d => [d.x, d.y],
      getIcon: (d) => {
        if (d.zoomLevels[z] !== null) {
          return d.zoomLevels[z].icon;
        }
        return null;
      },
      getSize: d => (this.showCluster ? d.zoomLevels[z] && d.zoomLevels[z].size : 1),
      updateTriggers: {
        getIcon: z,
        getSize: z
      },
      onClick: d => console.log('info:', d)
    });
  }

  @computed get feedPins() {
    const pinsAtlas = this.props.store.prepared.mapPics.pins;
    const pinsMapping = this.props.store.prepared.mapPics.pinsJSON;

    return new IconLayer({
      id: 'map-pins-layer',
      data: this.props.store.pins.pins,
      // visible: this.options.mapDecorations,
      pickable: true,
      getAngle: 135,
      iconAtlas: pinsAtlas,
      iconMapping: pinsMapping,
      sizeScale: 3,
      getSize: () => (this.props.store.deck.zoom * 10),
      getPosition: d => [d.point.x, d.point.y],
      getIcon: d => `pin-${d.pic}`,
      getColor: () => [66, 66, 66],
      updateTriggers: {
        getSize: this.props.store.deck.zoom,
      },
      onClick: d => console.log('pin:', d),
      onHover: (d) => {
        // if image contains transparent parts disable drawing tooltip
        const key = d.color === null ? null : d.object.key;
        this.props.store.pins.setActive(key, false);
        this.props.store.pins.setPosition(d.x, d.y);
      },
    });
  }

  @computed get width() {
    return this.props.store.view.width;
  }

  @computed get height() {
    return this.props.store.view.height;
  }

  @action resize() {
    this.props.store.view.width = window.innerWidth;
    this.props.store.view.height = window.innerHeight;
  }

  render() {
    const z = this.props.store.deck.rZoom;
    const updateTrigger = z * this.showCluster;

    const decorAtlas = this.props.store.prepared.mapPics.decorations;
    const decorMapping = this.props.store.prepared.mapPics.decorationsJSON;

    const layers = [
      this.terrain,
      this.borders,
      ...this.toponyms,
      this.cityPoints,
      new IconLayer({
        id: 'map-decoration-layer',
        data: this.decorations,
        visible: this.options.mapDecorations,
        pickable: true,
        iconAtlas: decorAtlas,
        iconMapping: decorMapping,
        getAngle: d => d.transform.rotate,
        sizeScale: 3,
        getSize: d => (this.props.store.deck.zoom * d.transform.scale),
        getPosition: d => [d.geopoint[0], d.geopoint[1]],
        getIcon: d => `decoration-${d.picId}`,
        getColor: () => [66, 66, 66],
        updateTriggers: {
          getSize: this.props.store.deck.zoom,
        },
        onClick: d => console.log('decor:', d)
      }),
      new PathLayer({
        id: 'static-traces-layer',
        data: this.traces,
        visible: this.options.traces && !this.props.store.flags.flags.runtime.animation,
        getPath: d => toJS(d.data.path[0].path),
        getColor: () => [65, 140, 171],
        getWidth: () => 5,
        rounded: true,
        widthScale: 3,
        widthMinPixels: 2,
        getDashArray: () => [10, 10],
        // onClick: d => console.log(d.data.id),
      }),
      this.feedPins,
      new TripsLayer({
        id: 'animated-trace-layer',
        data: this.traces,
        visible: this.options.traces && this.props.store.flags.flags.runtime.animation,
        getPath: d => toJS(d.timedTraces),
        getColor: () => [65, 140, 171],
        opacity: 1,
        strokeWidth: 10,
        trailLength: 180,
        currentTime: this.props.store.animation.time
      }),
      new TextLayer({
        id: 'cities-layer',
        data: this.cities,
        pickable: true,
        visible: this.options.cities,
        getText: d => (d.zoomLevels[z] ? d.name : ''),
        getPosition: d => [d.x, d.y],
        getPixelOffset: [0, 10],
        getSize: d => (40 - (1.5 * d.scaleRank)),
        fp64: true,
        sizeScale: 0.5,
        getTextAnchor: 'middle',
        fontFamily: 'OpenSans-Light',
        characterSet: chars,
        getAlignmentBaseline: 'top',
        updateTriggers: {
          getText: updateTrigger,
          getSize: updateTrigger,
        },
      }),
      new IconLayer({
        id: 'test-layer',
        data: testData,
        visible: true,
        pickable: false,
        iconAtlas: testingAtlas,
        iconMapping: testingMapping,
        sizeScale: 3,
        getSize: d => d.size,
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
        style={{ zIndex: 1 }}
        width={this.width}
        height={this.height}
      />
    );
  }
}

export default MapWrapper;
