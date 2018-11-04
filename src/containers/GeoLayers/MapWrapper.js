import React from 'react';
import DeckGL from 'deck.gl';

import { StaticMap } from 'react-map-gl';

import { observer, inject } from 'mobx-react';
import {
  computed, action
} from 'mobx';

import bordersLayer from './Layers/BordersLayer';
import toponymsLayer from './Layers/ToponymsLayer';
import cityPointsLayer from './Layers/CityPointsLayer';
import cityTextLayer from './Layers/CityTextLayer';
import oceanDecorationLayer from './Layers/OceanDecorationLayer';
import mapDecorationsLayer from './Layers/MapDecorationsLayer';
import expeditionsLayer from './Layers/ExpeditionsLayer';
import pinsLayer from './Layers/PinsLayer';

@inject('store')
@observer
class MapWrapper extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
    window.addEventListener('orientationchange', () => this.resize(), false);
    this.resize();
  }

  componentWillUnmount() {
    this.onWebGLInitialized(null);
    window.removeEventListener('resize', () => this.resize(), false);
    window.removeEventListener('orientationchange', () => this.resize(), false);
  }

  @action onWebGLInitialized(gl) {
    this.props.store.deck.gl = gl;
  }

  @computed get deck() {
    return this.props.store.deck;
  }

  @computed get options() {
    return this.props.store.flags.flags.layer;
  }

  @computed get borders() {
    const data = this.props.store.borders.features;
    const visible = this.options.borders;
    return bordersLayer(data, visible, this.onBorderHoverCb);
  }

  @computed get toponyms() {
    return toponymsLayer(
      this.props.store.prepared.decor.toponyms,
      this.options.labels,
      this.deck.rZoom
    );
  }

  @computed get cityPoints() {
    return cityPointsLayer(
      this.props.store.prepared.clusteredLocations,
      this.options.cities,
      this.deck
    );
  }

  @computed get cityText() {
    return cityTextLayer(
      this.props.store.prepared.clusteredLocations,
      this.options.cities,
      this.deck
    );
  }

  @computed get oceanDecorations() {
    return oceanDecorationLayer(
      this.props.store.prepared.decor.oceans,
      this.options.mapDecorations,
      this.deck
    );
  }

  @computed get mapDecorations() {
    return mapDecorationsLayer(
      this.props.store.prepared.decor.decorations,
      this.options.mapDecorations,
      this.deck
    );
  }

  @computed get expeditions() {
    return expeditionsLayer(
      this.props.store.prepared.expeditions,
      this.options.traces,
      this.props.store.flags.flags.runtime.animation,
      this.props.store.animation.time
    );
  }

  @computed get feedPins() {
    const { pins } = this.props.store.pins;
    const { zoom } = this.deck;
    const coursePins = this.props.store.prepared.data.courseGeoPoints.current;

    return [
      pinsLayer(pins, 'map', zoom, true, this.onMapPinHover),
      pinsLayer(coursePins, 'course', zoom, false),
    ];
  }

  @computed get layers() {
    return [
      this.borders,
      ...this.toponyms,
      this.cityPoints,
      this.oceanDecorations,
      this.mapDecorations,
      this.expeditions,
      ...this.feedPins,
      this.cityText,
    ];
  }

  onBorderHoverCb = (d) => {
    // if image contains transparent parts disable drawing tooltip
    const key = d.color === null ? null : d.object.props;
    this.props.store.pins.setCountryActive(key);
    this.props.store.pins.setPosition(d.x, d.y);
  };

  onMapPinHover = (d) => {
    // if image contains transparent parts disable drawing tooltip
    const key = d.color === null ? null : d.object.key;
    this.props.store.pins.setActive(key, false);
    this.props.store.pins.setPosition(d.x, d.y);
  };

  @action resize() {
    this.props.store.deck.width = window.innerWidth;
    this.props.store.deck.height = window.innerHeight;
  }

  render() {
    return (
      <DeckGL
        views={this.deck.view}
        viewState={this.deck.viewState}
        onViewStateChange={v => this.deck.updateViewState(v.viewState)}
        style={{ zIndex: 1 }}
        layers={this.layers}
        onWebGLInitialized={gl => this.onWebGLInitialized(gl)}
      >
        {this.deck.gl && (
          <StaticMap
            // ref={(ref) => {
            //   this.map = ref && ref.getMap();
            // }}
            gl={this.deck.gl}
            mapStyle={this.deck.mapBox.style}
            mapboxApiAccessToken={this.deck.mapBox.token}
          />
        )}
      </DeckGL>
    );
  }
}

export default MapWrapper;
