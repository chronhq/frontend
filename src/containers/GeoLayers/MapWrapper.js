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

import { InteractiveMap } from 'react-map-gl';

import { observer, inject } from 'mobx-react';
import {
  computed, action
} from 'mobx';

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

  onBorderHoverCb = (features, position, force = false) => {
    let key = null;
    const feature = features.length > 0
      ? features[0]
      : { layer: { id: '0' }, properties: { id: '1' } };
    try {
      if (feature.layer.source === 'ap') {
        // it's one of our border layers
        key = this.props.store.spaceTimeVolume.hovering(feature);
        this.props.store.balloon.setCountryBalloon(key, force);
        if (key !== null && key !== undefined) {
          if (force === true) this.props.store.analytics.metricHit('check_country');
          this.props.store.balloon.setPosition(...position);
        }
        return true;
      } if (feature.layer.source === 'events') {
        const events = features.filter(f => f.layer.source === 'events');
        this.props.store.balloon.setMVTEventBalloon(events, force);
        this.props.store.balloon.setPosition(...position);
        return true;
      } if (feature.layer.source === 'pinsGJ') {
        this.props.store.balloon.setGJEventBalloon(feature.properties.info, force);
        this.props.store.balloon.setPosition(...position);
        return true;
      }
    } catch (e) {
      console.error('Feature parsing failed', e, features);
    }
    // Hide balloon if not active layer
    this.props.store.balloon.setCountryBalloon(null, false);
    return true;
  };

  setHoverBalloon = force => (
    (pointerEvent) => {
      if (force === false && this.props.store.balloon.pinned === true) return;
      const { features, point } = pointerEvent;
      this.onBorderHoverCb(features, point, force);
    }
  )

  @action resize() {
    this.props.store.deck.width = window.innerWidth;
    this.props.store.deck.height = window.innerHeight;
  }

  render() {
    return (
      <InteractiveMap
        style={{ zIndex: 1 }}
        {...this.deck.viewState}
        onViewStateChange={(e) => {
          this.deck.updateViewState(e.viewState);
        }}
        mapStyle={this.props.store.mapStyle.style}
        mapboxApiAccessToken={this.props.store.mapStyle.accessToken}
        ref={(ref) => {
          this.deck.interactiveMap = ref;
        }}
        onLoad={() => {
          // starting a timer for status checking
          this.deck.watchLoading();
        }}
        onHover={this.setHoverBalloon(false)}
        onClick={(pointerEvent) => {
          if (this.props.store.balloon.unpin() !== true) {
            this.props.store.analytics.metricHit('check_map');
            this.props.store.balloon.clickPosition = pointerEvent.lngLat;
            this.setHoverBalloon(true)(pointerEvent);
          }
        }}
        onMouseOut={() => this.props.store.balloon.setPinBalloon(null)}
        // There is no such event for mapbox gl
        // eslint(jsx-a11y/mouse-events-have-key-events)
        onBlur={() => ''}
      />
    );
  }
}

export default MapWrapper;
