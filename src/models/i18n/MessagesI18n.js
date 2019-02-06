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
import BaseI18n from './BaseI18n';

export default class MessagesI18n extends BaseI18n {
  person(person, type) {
    const label = person[this.nameSelector];
    let location;
    let title;
    if (type === 'birth') {
      location = this.cities[person.birthPlace]
        ? this.cities[person.birthPlace].location.name : '';
      title = this.data.messages.personBirth;
    } else {
      location = this.cities[person.deathPlace]
        ? this.cities[person.deathPlace].location.name : '';
      title = this.data.messages.personDeath;
    }

    return {
      id: person.id,
      key: `person_${type}_${person.id}`,
      title,
      label,
      birthDate: person.birthDate ? person.birthDate : this.data.unknown.year,
      deathDate: person.deathDate ? person.deathDate : this.data.unknown.year,
      location
    };
  }
}
