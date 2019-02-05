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

class WikidataTerritorialEntity extends WikidataGenericEntity {
  // media.flagImages - observable for storing wikimeda

  getFileName = s => s.mainsnak.datavalue.value;

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
    // This is an array of wikidata 'flag images' items
    // this.full.claims.P41
    return this.full.claims.P41 === undefined
      ? []
      : this.full.claims.P41.map(f => ({
        file: this.getFileName(f),
        start: this.getDate(f.qualifiers, 'P580'),
        end: this.getDate(f.qualifiers, 'P582'),
      }));
  }

  @computed get activeFlag() {
    const flag = this.flags.find(f => ((
      f.start === null
      || f.start.getFullYear() <= this.now
    ) && (
      f.end === null
      || f.end.getFullYear() >= this.now
    )));
    if (flag !== undefined
      && flag.file !== undefined && this.media.flagImages !== undefined) {
      const image = this.media.flagImages[flag.file];
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

  constructor(rootStore, type, full, simple) {
    super(rootStore, type, full, simple);
    this.obtainImages(this.flags.map(f => f.file), 'flagImages');
    this.obtainImages(this.entity.claims.P94, 'coatOfArms');
  }
}

export default WikidataTerritorialEntity;
