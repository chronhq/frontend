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
  oceanDecorationLayer,
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

  @computed get oceanDecorations() {
    return oceanDecorationLayer(
      this.props.store.decor.oceans,
      this.options.mapDecorations,
      this.deck
    );
  }

  @computed get geoPoints() {
    const geoPoints = this.props.store.data.CourseGeopoints.data;
    return this.props.store.year.tick in geoPoints
      ? geoPoints[this.props.store.year.tick]
      : [];
  }

  @computed get feedPins() {
    const { pins } = this.props.store.pins;
    const { zoom } = this.deck;
    const coursePins = this.geoPoints;

    return [
      pinsLayer(pins, 'map', zoom, true, this.onMapPinHover),
      pinsLayer(coursePins, 'course', zoom, false),
    ];
  }

  @computed get layers() {
    return [
      this.oceanDecorations,
      ...this.feedPins,
    ];
  }

  onBorderHoverCb = (features, position, force = false) => {
    let key = null;
    const feature = features.length > 0
      ? features[0]
      : { layer: { id: '0' }, properties: { id: '1' } };
    try {
      if (feature.layer.id === this.props.store.atomicBorders.layerName) {
        // it's one of our border layers
        key = this.props.store.spaceTimeVolume.hovering(feature.properties.id).shift();
      }
    } catch (e) {
      console.error('Feature parsing failed', e, features);
    }
    this.props.store.pins.setCountryActive(key, force);
    if (key !== null && key !== undefined) {
      this.props.store.pins.setPosition(...position);
    }
    return true;
  };

  onMapPinHover = (d, force = false) => {
    // if image contains transparent parts disable drawing tooltip
    const key = d.color === null ? null : d.object.key;
    this.props.store.pins.setActive(key, false, force);
    this.props.store.pins.setPosition(d.x, d.y);
    // according to https://github.com/uber/deck.gl/blob/master/docs/get-started/interactivity.md
    // event should be marked as complete if returns true
    // but DeckGL onLayerHover will catch the event even if it should not
    return false;
  };

  setHoverBalloon = force => (
    (info, allInfos, event) => {
      if (force === false && this.props.store.pins.pinned === true) return;
      const mapboxFeatures = this.deck.interactiveMap
        .queryRenderedFeatures([event.offsetX, event.offsetY]);
      if (event.type === 'mouseleave') {
        // disable all balloons
        this.props.store.pins.setActive(null);
      } else if (info === null) {
        this.onBorderHoverCb(mapboxFeatures, [event.offsetX, event.offsetY], force);
      }
    }
  )

  printDebugSTVInfo = (event) => {
    const mapboxFeatures = this.deck.interactiveMap
      .queryRenderedFeatures([event.offsetX, event.offsetY]);
    // console.log(mapboxFeatures);
    mapboxFeatures.map((f) => {
      console.log('mbF', f);
      if (f.properties !== undefined && f.properties.id) {
        const STVs = this.props.store.spaceTimeVolume;
        const stvIds = STVs.hovering(f.properties.id);
        const names = stvIds.map(s => ([
          STVs.current[s].values.title,
          STVs.current[s].values.subTitle
        ].join()));
        console.log(
          'AP:', f.properties.id,
          'Clicked on STVs:', stvIds, names
        );
      }
      return null;
    });
  }

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
        onLayerClick={(info, allInfos, event) => {
          this.printDebugSTVInfo(event);
          if (this.props.store.pins.unpin() !== true) {
            this.props.store.pins.clickPosition = this.deck
              .interactiveMap.getMap().unproject([event.offsetX, event.offsetY]);
            this.setHoverBalloon(true)(info, allInfos, event);
          }
        }}
        onLayerHover={this.setHoverBalloon(false)}
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
