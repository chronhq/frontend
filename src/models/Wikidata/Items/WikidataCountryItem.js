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
import { observable, computed } from 'mobx';
import WikidataItem from './WikidataItem';


class WikidataCountryItem extends WikidataItem {
  @observable queries = ['country', 'flag', 'capital', 'head', 'form', 'population'];

  @observable saveEffects = {
    country: this.fixData('country', 'item', false),
    flag: this.fixData('flag', 'flag'),
    capital: this.fixData('capital', 'capital'),
    head: this.fixData('head', 'head'),
    form: this.fixData('form', 'form'),
    population: this.fixData('population', 'population')
  };

  fixData(key, label, dates = true) {
    return () => {
      this.data[key] = this.data[key].map((d) => {
        const fixedDates = dates ? this.fixDates(d) : {};
        const fixedLabel = label ? this.labelAndURI(d, label) : {};
        return { ...d, ...fixedDates, ...fixedLabel };
      });
    };
  }

  fixDates = (h) => {
    const start = this.dateFromLiteral(h.start);
    const end = this.dateFromLiteral(h.end);
    const date = this.dateFromLiteral(h.date);
    return {
      ...h, start, end, date
    };
  }

  inRange = f => ((
    f.start === null
    || f.start.getFullYear() <= this.now
  ) && (
    f.end === null
    || f.end.getFullYear() >= this.now
  ))

  @computed get current() {
    const current = {};
    current.head = (this.data.head) ? this.data.head.find(this.inRange) : null;
    // Can be more than one capital
    current.capital = (this.data.capital) ? this.data.capital.filter(this.inRange) : null;
    current.flag = (this.data.flag) ? this.data.flag.find(this.inRange) : null;
    current.form = (this.data.form) ? this.data.form.find(this.inRange) : null;
    // DESC Ordered by date
    current.population = (this.data.population)
      ? this.data.population.find(p => (
        p.date !== null
        && p.date.getFullYear() <= this.now))
      : null;
    return current;
  }
}

export default WikidataCountryItem;
