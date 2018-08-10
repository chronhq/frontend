import React from 'react';
import DeckGL, {
  TextLayer,
  IconLayer,
  PathLayer,
} from 'deck.gl';

import { observer, inject } from 'mobx-react';
import {
  computed, observable, toJS, action
} from 'mobx';

import bordersLayer from './Layers/BordersLayer';
import contourLayer from './Layers/ContourLayer';
import toponymsLayer from './Layers/ToponymsLayer';

import chars from './Layers/VisibleCharacters';

import testingAtlas from './geoAssets/cities2.svg';
import testingMapping from './geoAssets/cities2.json';

import TripsLayer from './trips-layer';
import pinsLayer from './Layers/PinsLayer';

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
    return this.props.store.prepared.decor.decorations;
  }

  @computed get oceans() {
    return this.props.store.prepared.decor.oceans;
  }

  @computed get cities() {
    return this.props.store.prepared.clusteredLocations;
  }

  @computed get traces() {
    return this.props.store.prepared.expeditions;
  }

  @computed get borders() {
    const properties = this.props.store.data.Properties.data;

    const colors = this.props.store.data.MapColors.data;

    const borders = this.props.store.borders.bordersPath;
    const visible = this.options.borders;
    const hoverCb = (d) => {
      // if image contains transparent parts disable drawing tooltip
      const key = d.color === null ? null : d.object.props;
      this.props.store.pins.setCountryActive(key);
      this.props.store.pins.setPosition(d.x, d.y);
    };
    return bordersLayer(borders, properties, colors, visible, hoverCb);
  }

  @computed get toponyms() {
    return toponymsLayer(
      this.props.store.prepared.decor.toponyms,
      this.options.labels,
      this.props.store.deck.rZoom
    );
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
    const { pins } = this.props.store.pins;
    const id = 'map-pins-layer';
    const cid = 'course-pins-layer';
    const { zoom } = { ...this.props.store.deck };
    const coursePins = this.props.store.prepared.data.courseGeoPoints.current;

    const onHover = (d) => {
      // if image contains transparent parts disable drawing tooltip
      const key = d.color === null ? null : d.object.key;
      this.props.store.pins.setActive(key, false);
      this.props.store.pins.setPosition(d.x, d.y);
    };
    return [
      pinsLayer(pinsAtlas, pinsMapping, pins, id, zoom, true, onHover),
      pinsLayer(pinsAtlas, pinsMapping, coursePins, cid, zoom, false),
    ];
  }

  @action resize() {
    this.props.store.deck.width = window.innerWidth;
    this.props.store.deck.height = window.innerHeight;
  }

  render() {
    const z = this.props.store.deck.rZoom;
    const updateTrigger = z * this.showCluster;

    const decorAtlas = this.props.store.prepared.mapPics.decorations;
    const decorMapping = this.props.store.prepared.mapPics.decorationsJSON;

    const oceanAtlas = this.props.store.prepared.mapPics.oceans;
    const oceanMapping = this.props.store.prepared.mapPics.oceansJSON;

    const layers = [
      this.terrain,
      this.borders,
      ...this.toponyms,
      this.cityPoints,
      new IconLayer({
        id: 'map-oceans-layer',
        data: this.oceans,
        visible: this.options.mapDecorations,
        pickable: true,
        iconAtlas: oceanAtlas,
        iconMapping: oceanMapping,
        getAngle: 0,
        sizeScale: 3,
        getSize: d => (this.props.store.deck.zoom * d.size),
        getPosition: d => [d.geopoint[0], d.geopoint[1]],
        getIcon: d => `ocean-${d.picId}`,
        updateTriggers: {
          getSize: this.props.store.deck.zoom,
        },
        onClick: d => console.log('ocean:', d)
      }),
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
      ...this.feedPins,
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
      // new LineLayer({
      //   id: 'debug-line-layer',
      //   data: debugData,
      //   pickable: false,
      //   getStrokeWidth: 20,
      //   getSourcePosition: d => d.from.coordinates,
      //   getTargetPosition: d => d.to.coordinates,
      //   getColor: () => [0, 0, 140]
      // })
    ];
    return (
      <DeckGL
        views={this.props.store.deck.view}
        viewState={this.props.store.deck.viewState}
        onViewStateChange={v => this.props.store.deck.updateViewState(v.viewState)}
        style={{ zIndex: 1 }}
        layers={layers}
      />
    );
  }
}

export default MapWrapper;
