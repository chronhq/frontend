/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import DeckGL from '@deck.gl/react';

import { InteractiveMap, FlyToInterpolator } from 'react-map-gl';

import { observer, inject } from 'mobx-react';
import {
  computed, action
} from 'mobx';

import {
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

  onBorderHoverCb = (features, position) => {
    let key = null;
    const feature = features.length > 0
      ? features[0]
      : { layer: { id: '0' }, properties: { id: '1' } };
    try {
      if (feature.layer.id === this.props.store.borders.layerName) {
        // it's one of our border layers
        key = this.props.store.borders.actualData[feature.properties.id];
      }
    } catch (e) {
      console.error('Feature parsing failed', e, features);
    }
    this.props.store.pins.setCountryActive(key);
    if (key !== null) {
      this.props.store.pins.setPosition(...position);
    }
    return true;
  };

  onMapPinHover = (d) => {
    // if image contains transparent parts disable drawing tooltip
    const key = d.color === null ? null : d.object.key;
    this.props.store.pins.setActive(key, false);
    this.props.store.pins.setPosition(d.x, d.y);
    // according to https://github.com/uber/deck.gl/blob/master/docs/get-started/interactivity.md
    // event should be marked as complete if returns true
    // but DeckGL onLayerHover will catch the event even if it should not
    return false;
  };

  @action resize() {
    this.props.store.deck.width = window.innerWidth;
    this.props.store.deck.height = window.innerHeight;
  }

  render() {
    return (
      <DeckGL
        viewState={this.deck.viewState}
        style={{ zIndex: 1 }}
        layers={this.layers}
        views={this.deck.view}
        onViewStateChange={v => this.deck.updateViewState(v.viewState)}
        onLayerHover={(info, allInfos, event) => {
          const mapboxFeatures = this.deck.interactiveMap
            .queryRenderedFeatures([event.offsetX, event.offsetY]);
          if (event.type === 'mouseleave') {
            // disable all balloons
            this.props.store.pins.setActive(null);
          } else if (info === null) {
            this.onBorderHoverCb(mapboxFeatures, [event.offsetX, event.offsetY]);
          }
        }}
      >
        <InteractiveMap
          transitionDuration={this.props.store.deck.transition}
          transitionInterpolator={new FlyToInterpolator()}
          mapStyle={this.props.store.mapStyle.style}
          mapboxApiAccessToken={this.props.store.mapStyle.accessToken}
          ref={(ref) => {
            this.deck.interactiveMap = ref;
          }}
          onLoad={() => {
            // starting a timer for status checking
            this.deck.watchLoading();
          }}
          // this event handled in DeckGL layer hover
          // onHover={this.onBorderHoverCb}
        />
      </DeckGL>
    );
  }
}

export default MapWrapper;
