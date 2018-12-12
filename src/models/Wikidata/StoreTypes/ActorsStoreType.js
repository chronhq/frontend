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
import { computed } from 'mobx';
import GenericStoreType from './GenericStoreType';

class ActorsStoreType extends GenericStoreType {
  @computed get timeline() {
    return this.inCache.reduce((prev, cur) => {
      const misc = {
        deathDate: cur.dateOfDeathText,
        birthDate: cur.dateOfBirthText,
      };

      return ['birth', 'death'].reduce((p, type) => {
        const typeU = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
        const year = cur[`dateOf${typeU}`].getUTCFullYear();

        const person = {
          wd: true, // this entity is from wikidata
          key: cur.id,
          id: cur.id,
          title: this.rootStore.i18n.data.messages[`person${typeU}`],
          label: cur.label,
          location: cur[`placeOf${typeU}`].label
            || this.rootStore.i18n.data.unknown.place,
          ...misc,
        };
        const event = {
          type,
          loc: cur[`placeOf${typeU}`],
          person,
        };
        const curYear = p[year] || { free: [], pins: [] };
        const pos = event.loc.x !== undefined ? 'pins' : 'free';

        return {
          ...p,
          [year]: { // birth | death
            ...curYear, // [year] : { free, pins }
            [pos]: [...curYear[pos], event]
          }
        };
      }, prev);
    }, { /* [year]: { free: [], pins: [] } */ });
  }
}

export default ActorsStoreType;
