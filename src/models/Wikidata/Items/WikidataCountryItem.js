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
import * as queries from './Queries';

import { julianInt } from '../../YearModel';

class WikidataCountryItem extends WikidataItem {
  @observable queries = ['country', 'form'];

  @observable extra = ['flag', 'capital', 'head', 'population'];

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
        const fixedDates = dates ? this.fixDates(d) : this.fixCountryDates(d);
        const fixedLabel = label ? this.labelAndURI(d, label) : {};
        return { ...d, ...fixedDates, ...fixedLabel };
      });
    };
  }

  fixCountryDates = (h) => {
    const inception = this.dateFromLiteral(h.inception);
    const dissolution = this.dateFromLiteral(h.dissolution);
    return { ...h, inception, dissolution };
  }

  fixDates = (h) => {
    const start = this.dateFromLiteral(h.start);
    const end = this.dateFromLiteral(h.end);
    const date = this.dateFromLiteral(h.date);
    return {
      ...h, start, end, date
    };
  }

  loadExtraData = () => (
    this.extra.map((q, i) => (
      setTimeout(
        () => this.loadData(queries[q], q),
        Math.random() * 30 * i
      )
    ))
  );

  inRange = (f) => ((
    f.start === null
    || julianInt(f.start) <= this.now
  ) && (
    f.end === null
    || julianInt(f.end) >= this.now
  ))

  @computed get current() {
    const current = {};
    current.country = (this.data.country) ? this.data.country[0] : {};
    current.head = (this.data.head) ? this.data.head.find(this.inRange) : {};
    // Can be more than one capital
    current.capital = (this.data.capital) ? this.data.capital.filter(this.inRange) : {};
    current.flag = (this.data.flag) ? this.data.flag.find(this.inRange) : {};
    current.form = (this.data.form) ? this.data.form.find(this.inRange) : {};
    // DESC Ordered by date
    current.population = (this.data.population)
      ? this.data.population.find((p) => (
        p.date !== null
        && julianInt(p.date) <= this.now))
      : {};
    return current;
  }
}

export default WikidataCountryItem;
