/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { observable, computed, action } from 'mobx';
import { typesMapping } from './Wikidata/WikidataHelper';

export default class BalloonModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // reaction on onClick event for countryHover
  @observable pinned = false;

  @observable payload = null;

  @observable deckPin = false;

  @observable pinHasNoLocation = false;

  @observable countryHover = false;

  @observable eventPin = false;

  @observable GJPin = false;

  @observable pageX = 0;

  @observable pageY = 1;

  @observable clickPositionRaw = { lat: 0, lon: 0 };

  @action setPosition(x, y) {
    this.pageX = x;
    this.pageY = y;
  }

  @action changePinnedStatus(a, force) {
    if (force === true) this.pinned = true;
    if (a === null) this.pinned = false;
  }

  @action unpin() {
    if (this.pinned === true) {
      this.pinned = false;
      return true;
    }
    return false;
  }

  @action changeBalloonStatus({
    a = null, force = false,
    countryHover = false, deckPinId = false, GJPin = false,
    pinHasNoLocation = false, eventPin = false
  }) {
    this.changePinnedStatus(a, force);
    if (this.pinned === false || force === true) {
      this.payload = a;
      this.countryHover = countryHover;
      this.deckPinId = deckPinId;
      this.pinHasNoLocation = pinHasNoLocation;
      this.eventPin = eventPin;
      this.GJPin = GJPin;
    }
  }

  @action setGJEventBalloon(p, force = false) {
    try {
      const a = JSON.parse(p);
      this.changeBalloonStatus({ a, force, GJPin: Boolean(a) });
    } catch (e) {
      this.changeBalloonStatus({ a: null, force: false, GJPin: false });
    }
  }

  @action setMVTEventBalloon(a, force = false) {
    if (!this.eventPin && Boolean(a)) {
      const wIds = a.map(f => `Q${f.properties.wikidata_id}`);
      this.rootStore.wikidata.getItems(wIds);
      if (a.some(f => f.layer.id === 'battle')) {
        this.rootStore.analytics.metricHit('check_battle');
      }
    }
    this.changeBalloonStatus({ a, force, eventPin: Boolean(a) });
  }

  // Set active pin by it's key for Deck GL layer and SVG Free pins
  @action setPinBalloon(a, free = false, force = false) {
    this.changeBalloonStatus({
      a, force, pinHasNoLocation: free, deckPinId: Boolean(a)
    });
  }

  // set Territorial Entity Wikidata ID to countryHover
  @action setCountryBalloon(a, force = false) {
    this.changeBalloonStatus({ a, force, countryHover: Boolean(a) });
  }

  @computed get clickPosition() {
    const pos = this.clickPositionRaw;
    return {
      lat: Math.round(pos.lat * 1000000) / 1000000,
      lng: Math.round(pos.lng * 1000000) / 1000000,
    };
  }

  set clickPosition(clickPosition) {
    this.clickPositionRaw = clickPosition;
  }

  @computed get pins() {
    return this.rootStore.pins.pins;
  }

  @computed get freePins() {
    return this.rootStore.pins.freePins;
  }

  @computed get getSelectedEvents() {
    if (this.eventPin) {
      try {
        const data = this.payload.map((f) => {
          const wId = `Q${f.properties.wikidata_id}`;
          if (this.rootStore.wikidata.cache[wId] === undefined) {
            return undefined;
          }
          const layer = typesMapping[f.layer.id].store;
          return this.rootStore.wikistore[layer].getEventFromWid(f.layer.id, wId);
        }).filter(f => (f !== undefined && f !== null));
        return { info: data };
      } catch (e) {
        console.error('Failed to parse Balloon payload', e, this.payload);
      }
    }
    return { info: [] };
  }

  @computed get selected() {
    if (this.pinHasNoLocation) {
      return this.freePins.find(pin => pin.key === this.payload);
    } if (this.deckPin) {
      return this.pins.find(pin => pin.key === this.deckPin);
    } if (this.countryHover) {
      // InteractivePin
      return { info: [{ type: 'countryHover', data: this.payload }] };
    } if (this.GJPin && Array.isArray(this.payload)) {
      return { info: this.payload };
    } if (this.eventPin) {
      return this.getSelectedEvents;
    }
    return { info: [] };
  }
}
