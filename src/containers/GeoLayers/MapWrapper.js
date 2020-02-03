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

import 'mapbox-gl/dist/mapbox-gl.css';
import { InteractiveMap } from 'react-map-gl';

import { observer, inject } from 'mobx-react';
import {
  computed, action
} from 'mobx';

import disabled from '../../../disabled.json';

@inject('store')
@observer
class MapWrapper extends React.Component {
  resize = action(() => {
    // TODO better mapbox position handling
    const box = this.ref.getBoundingClientRect();
    this.props.store.deck.top = box.top;
    this.props.store.deck.left = box.left;
    // This will work only with shift from the left side
    this.props.store.deck.width = window.innerWidth - box.left;
    this.props.store.deck.height = window.innerHeight - box.top;
  })

  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
    window.addEventListener('orientationchange', () => this.resize(), false);
    this.resize();
    if (disabled.map) {
      this.deck.initialLoad(true);
      console.info('Geometry Layers were disabled by ENV');
    }
  }


  componentWillUnmount() {
    this.toggleDataLoadingEventListeners('off');
    this.deck.initialLoad(false);
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
    const feature = (features && features.length > 0)
      ? features[0]
      : { layer: { id: '0', source: 'unknown' }, properties: { id: '1' } };
    try {
      if (feature.layer.source === 'stv') {
        // it's one of our border layers
        this.props.store.balloon.setMVTCountryBalloon(feature.properties, force);
        this.props.store.balloon.setPosition(...position);
        return true;
      } if (feature.layer.source === 'events') {
        const events = features.filter((f) => f.layer.source === 'events');
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
    this.props.store.balloon.setMVTCountryBalloon(null, false);
    return true;
  };

  setHoverBalloon = (force) => (
    (pointerEvent) => {
      if (force === false && this.props.store.balloon.pinned === true) return;
      const { features } = pointerEvent;
      const point = [pointerEvent.center.x, pointerEvent.center.y];
      this.onBorderHoverCb(features, point, force);
    }
  )

  dataLoadingListener = (e) => this.deck.isLoaded(e)

  toggleDataLoadingEventListeners = (t = 'on') => {
    // when map is disabled
    if (!this.deck.interactiveMap) return;
    const map = this.deck.interactiveMap.getMap();
    map[t]('dataloading', this.dataLoadingListener);
    map[t]('data', this.dataLoadingListener);
  }

  render() {
    if (disabled.map) {
      const stripes = [
        '-45deg',
        'rgba(0, 0, 0, 0.2)',
        'rgba(0, 0, 0, 0.2) 10px',
        'rgba(0, 0, 0, 0.3) 10px',
        'rgba(0, 0, 0, 0.3) 20px'].join(',');

      const background = `repeating-linear-gradient(${stripes})`;
      return (
        <div
          id='map-wrapper'
          style={{
            zIndex: 1, width: '100vw%', height: '100vh', background
          }}
          role='button'
          tabIndex={0}
          onClick={() => this.props.store.balloon.unpin()}
          onMouseEnter={this.setHoverBalloon(true)}
          onKeyPress={this.setHoverBalloon(true)}
        />
      );
    }

    return (
      <div id='map-wrapper' ref={(r) => { this.ref = r; }}>
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
            this.deck.initialLoad(true);
            this.toggleDataLoadingEventListeners('on');
          }}
          onHover={this.setHoverBalloon(false)}
          onClick={(pointerEvent) => {
            if (this.props.store.balloon.unpin() !== true) {
              this.props.store.analytics.metricHit('check_map');
              this.props.store.balloon.clickPosition = pointerEvent.lngLat;
              this.setHoverBalloon(true)(pointerEvent);
            }
          }}
          // keep pinned balloon oppened onMouseLeave
          onMouseOut={() => (this.props.store.balloon.pinned === false
            && this.props.store.balloon.setPinBalloon(null))}
          // There is no such event for mapbox gl
          // eslint(jsx-a11y/mouse-events-have-key-events)
          onBlur={() => ''}
        />
      </div>
    );
  }
}

export default MapWrapper;
