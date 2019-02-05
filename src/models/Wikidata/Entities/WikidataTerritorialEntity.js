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

import {
  computed
} from 'mobx';

import { wikidataTimeToDateObject } from 'wikidata-sdk/lib/helpers/helpers';

import WikidataGenericEntity from './WikidataGenericEntity';
import { natureOfStatement } from '../WikidataHelper';

class WikidataTerritorialEntity extends WikidataGenericEntity {
  // media.flagImages - observable for storing wikimeda

  getValueItem = s => s.mainsnak.datavalue.value;

  getNatureOfStatement = (d) => {
    const { deJure, id } = natureOfStatement;
    try {
      if (d === undefined || d[id] === undefined) return true;
      const v = d[id][0];
      return v.datavalue.value.id === deJure;
    } catch (e) {
      return true; // deJure
    }
  };

  getDate = (d, p) => {
    try {
      if (d === undefined || d[p] === undefined) return null;
      const v = d[p][0];
      if (v.snaktype === 'novalue') return null;
      if (v.snaktype !== 'value') {
        const err = {
          err: 'Unexpected snacktype',
          value: v.snaktype
        };
        throw err;
      }
      return wikidataTimeToDateObject(v.datavalue.value);
    } catch (e) {
      console.error('getDate failed', JSON.parse(JSON.stringify(d)), p);
      return null;
    }
  }

  getRangeValue(P, cb = f => ({ value: this.getValueItem(f) })) {
    return this.full.claims[P] === undefined
      ? []
      : this.full.claims[P].map(f => ({
        start: this.getDate(f.qualifiers, 'P580'),
        end: this.getDate(f.qualifiers, 'P582'),
        ...cb(f),
      }));
  }

  inRange = f => ((
    f.start === null
    || f.start.getFullYear() <= this.now
  ) && (
    f.end === null
    || f.end.getFullYear() >= this.now
  ))

  getActiveEntity = (items) => {
    // picks first match
    if (items === undefined) return undefined;
    const cur = items.find(this.inRange);
    if (cur !== undefined && cur.value !== undefined) {
      return {
        item: cur,
        label: this.cache[cur.value.id] !== undefined
          ? this.cache[cur.value.id].label : undefined,
      };
    }
    return undefined;
  }

  @computed get capitals() {
    return this.getRangeValue('P36', f => ({
      value: this.getValueItem(f),
      deJure: this.getNatureOfStatement(f.qualifiers),
    }));
  }

  @computed get capital() {
    return this.capitals.reduce((prev, cur) => {
      if (this.inRange(cur)) {
        const k = cur.deJure ? 'deJure' : 'deFacto';
        return {
          ...prev,
          [k]: {
            id: cur.value.id,
            label: this.cache[cur.value.id] !== undefined
              ? this.cache[cur.value.id].label : undefined,
          },
        };
      }
      return prev;
    }, { deJure: undefined, deFacto: undefined });
  }

  @computed get headOfGovernment() {
    return this.getRangeValue('P6');
  }

  @computed get currentHead() {
    return this.getActiveEntity(this.headOfGovernment);
  }

  @computed get basicFormOfGovernment() {
    return this.getRangeValue('P122');
  }

  @computed get currentGovernment() {
    return this.getActiveEntity(this.basicFormOfGovernment);
  }

  @computed get population() {
    return this.full.claims.P1082 === undefined
      ? []
      : this.full.claims.P1082.map(f => ({
        amount: Number(f.mainsnak.datavalue.value.amount),
        date: this.getDate(f.qualifiers, 'P585'),
      })).sort((p1, p2) => p2.date - p1.date);
  }

  @computed get currentPopulation() {
    return this.population.find(p => (
      p.date !== null
      && p.date.getFullYear() <= this.now));
  }

  @computed get flags() {
    return this.getRangeValue('P41');
  }

  @computed get activeFlag() {
    const flag = this.flags.find(this.inRange);
    if (flag !== undefined
      && flag.value !== undefined && this.media.flagImages !== undefined) {
      const image = this.media.flagImages[flag.value];
      if (image !== undefined) return image.thumburl;
    }
    return undefined;
  }

  @computed get emblem() {
    if (Array.isArray(this.entity.claims.P94) && this.media.coatOfArms !== undefined) {
      const file = this.entity.claims.P94[0];
      const image = this.media.coatOfArms[file];
      if (image !== undefined) return image.thumburl;
    }
    return undefined;
  }

  deepDeps = () => ([
    ...this.capitals.map(c => c.value.id),
    ...this.basicFormOfgovernment.map(c => c.value.id),
    ...this.headOfGovernment.map(c => c.value.id)
  ].filter((v, i, s) => s.indexOf(v) === i));


  constructor(rootStore, type, full, simple) {
    super(rootStore, type, full, simple);
    this.flatDeps = [];
    this.obtainImages(this.flags.map(f => f.value), 'flagImages');
    this.obtainImages(this.entity.claims.P94, 'coatOfArms');
  }
}

export default WikidataTerritorialEntity;
