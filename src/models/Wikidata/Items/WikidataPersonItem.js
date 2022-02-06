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
import { override } from 'mobx';
import WikidataItem from './WikidataItem';

class WikidataPersonItem extends WikidataItem {
  @override get item() {
    if (this.data.person === undefined || !this.data.person.length) return {};
    const raw = this.data.person[0];

    const dateOfBirth = this.dateToString(this.dateFromLiteral(raw.dateOfBirth));
    const dateOfDeath = this.dateToString(this.dateFromLiteral(raw.dateOfDeath));
    const fixedBirth = this.labelAndURI(raw, 'placeOfBirth');
    const fixedDeath = this.labelAndURI(raw, 'placeOfDeath');

    const person = this.labelAndURI(raw, 'item');
    const image = raw.image ? raw.image.value : undefined;
    return {
      id: this.id,
      ...person,
      image,
      dateOfBirth,
      dateOfDeath,
      birth: fixedBirth,
      death: fixedDeath
    };
  }
  constructor(id, rootStore) {
    this.queries.push('person');
    this.saveEffects.person = () => null;

    super(id, rootStore);
  }
}

export default WikidataPersonItem;
