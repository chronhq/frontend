import React from 'react';
import DeckGL from '@deck.gl/react';

import { StaticMap, InteractiveMap } from 'react-map-gl';

import { observer, inject } from 'mobx-react';
import {
  computed, action
} from 'mobx';

import {
  bordersLayer,
  toponymsLayer,
  cityPointsLayer,
  cityTextLayer,
  oceanDecorationLayer,
  mapDecorationsLayer,
  expeditionsLayer,
  pinsLayer
} from '../../components/Layers';

@inject('store')
@observer
class MapWrapper extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
    window.addEventListener('orientationchange', () => this.resize(), false);
    this.resize();
  }

  componentWillUnmount() {
    this.deck.InteractiveMap = null;
    window.removeEventListener('resize', () => this.resize(), false);
    window.removeEventListener('orientationchange', () => this.resize(), false);
  }

  @computed get deck() {
    return this.props.store.deck;
  }

  @computed get options() {
    return this.props.store.flags.layer.list;
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
      this.props.store.flags.runtime.get('animation'),
      this.props.store.animation.time
    );
  }

  @computed get feedPins() {
    const { pins } = this.props.store.pins;
    const { zoom } = this.deck;
    const coursePins = this.props.store.prepared.geoPoints;

    return [
      pinsLayer(pins, 'map', zoom, true, this.onMapPinHover),
      pinsLayer(coursePins, 'course', zoom, false),
    ];
  }

  @computed get layers() {
    return [
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
      >
        <StaticMap
          mapStyle={this.deck.mapBox.style}
          mapboxApiAccessToken={this.deck.mapBox.token}
        />
        <InteractiveMap
          mapStyle={this.props.store.borders.style}
          mapboxApiAccessToken={this.deck.mapBox.token}
          pickable
          ref={(ref) => {
            this.deck.interactiveMap = ref;
          }}
          onLoad={() => {
            // starting a timer for status checking
            this.deck.watchLoading();
          }}
          onClick={(a) => {
            console.log('Interactive click', a);
          }}
        />
      </DeckGL>
    );
  }
}

export default MapWrapper;
