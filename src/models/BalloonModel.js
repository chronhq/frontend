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

export default class BalloonModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable dragOn = false;

  // reaction on onClick event for countryHover
  @observable pinned = false;

  @observable payload = null;

  @observable deckPin = false;

  @observable pinHasNoLocation = false;

  @observable countryHover = false;

  @observable eventPin = false;

  @observable GJPin = false;

  @observable pageX = 0;

  @observable pageY = 0;

  // observables for holding pinned state
  @observable pageXP = 0;

  @observable pageYP = 0;

  @observable clickPositionRaw = { lat: 0, lng: 0 };

  @action dragClick(b) {
    this.dragOn = b;
  }

  @action setPosition(x, y) {
    this.pageX = x;
    this.pageY = y;
  }

  @action changePinnedStatus(a, force) {
    if (force === true) {
      this.pinned = true;
      this.pageXP = this.pageX;
      this.pageYP = this.pageY;
    }
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
    if (Boolean(a) && (!this.eventPin || a !== this.payload)) {
      a.map((f) => {
        this.rootStore.wikidata.add(f.layer.id, f.properties.wikidata_id);
        return false;
      });
      if (a.some(f => f.layer.id === 'battle')) {
        this.rootStore.analytics.metricHit('check_battle');
      }
    }
    this.changeBalloonStatus({ a, force, eventPin: Boolean(a) });
  }

  @action setMVTCountryBalloon(a, force = false) {
    if (Boolean(a) && (!this.countryHover || a !== this.payload)) {
      this.rootStore.wikidata.add('country', a.wikidata_id);
      if (force === true) this.rootStore.analytics.metricHit('check_country');
    }
    this.changeBalloonStatus({ a, force, countryHover: Boolean(a) });
  }


  // Set active pin by it's key for Deck GL layer and SVG Free pins
  @action setPinBalloon(a, free = false, force = false) {
    if (Boolean(a) && (!this.pinHasNoLocation || a !== this.payload)) {
      this.rootStore.wikidata.add(a.type, a.wikidata_id);
    }
    this.changeBalloonStatus({
      a, force, pinHasNoLocation: free, deckPinId: Boolean(a)
    });
  }

  @computed get clickPosition() {
    const pos = this.clickPositionRaw;
    return {
      lat: Math.round(pos.lat * 1000000) / 1000000,
      lng: Math.round(pos.lng * 1000000) / 1000000,
    };
  }

  set clickPosition(clickPosition) {
    this.clickPositionRaw = { lng: clickPosition[0], lat: clickPosition[1] };
  }

  @computed get pins() {
    return this.rootStore.pins.pins;
  }

  @computed get freePins() {
    return this.rootStore.pins.freePins;
  }

  wikidataInfo = (wId, type) => {
    if (this.rootStore.wikidata.cache[wId] === undefined) {
      return undefined;
    }
    return {
      key: wId,
      type,
      [type]: this.rootStore.wikidata.cache[wId].item
    };
  }

  @computed get getSelectedEvents() {
    if (this.eventPin) {
      try {
        const data = this.payload.map((f) => {
          const wId = f.properties.wikidata_id;
          const type = f.layer.id;
          return this.wikidataInfo(wId, type);
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
      const pin = this.wikidataInfo(this.payload.wikidata_id, this.payload.type);
      return { info: pin ? [pin] : [] };
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
