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
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

const InfoLink = ({ wId, label = null }) => (
  <a
    className='factSource'
    href={`https://www.wikidata.org/wiki/${wId}`}
    target='_blank'
    rel='noopener noreferrer'
  >
    {label !== null ? label : wId}
  </a>
);

@inject('store')
@observer
class CountryHover extends React.Component {
  @computed get messages() {
    return this.props.store.i18n.data.countryHover;
  }

  @computed get pinned() {
    return this.props.store.balloon.pinned;
  }

  @computed get wikidata() {
    return this.props.store.wikidata.cache[`Q${this.props.data.wikidata_id}`];
  }

  @computed get base() {
    return this.wikidata === undefined
      ? {
        title: `Q${this.props.data.wikidata_id}`,
        subTitle: this.props.store.i18n.data.loading
      }
      : {
        title: this.wikidata.label,
        subTitle: '', // TODO add subtitle based on Political Relations
        government: this.wikidata.currentGovernment,
      };
  }

  @computed get extra() {
    return this.wikidata === undefined
      ? {}
      : {
        flag: this.wikidata.activeFlag,
        emblem: this.wikidata.emblem,
        capital: this.wikidata.capital,
        head: this.wikidata.currentHead,
        population: this.wikidata.currentPopulation,
      };
  }

  @computed get factHeader() {
    return (
      <p className='factHeader'>
        {this.base.title}
      </p>
    );
  }

  @computed get subTitleMessage() {
    return this.base.title === this.base.subTitle ? '' : (
      <p>
        {this.base.subTitle}
      </p>
    );
  }

  @computed get images() {
    if (this.pinned === false) return null;
    const img = i => (
      <img
        className='countryHoverImage'
        src={i}
        alt=''
      />
    );
    return (
      <div className='countryHoverImage'>
        {this.extra.flag !== undefined && img(this.extra.flag)}
        {this.extra.emblem !== undefined && img(this.extra.emblem)}
      </div>
    );
  }

  @computed get government() {
    return this.base.government === undefined ? '' : (
      <p>
        {this.base.government.label}
      </p>
    );
  }

  @computed get population() {
    if (this.pinned === false || this.extra.population === undefined) return null;
    const pop = new Intl.NumberFormat().format(this.extra.population.amount);
    return (
      <p>
        <span className='factSubTitle'>
          {this.messages.population}
          {': '}
        </span>
        {pop}
      </p>
    );
  }

  @computed get head() {
    if (this.pinned === false || this.extra.head === undefined) return null;
    return (
      <p>
        <span className='factSubTitle'>
          {this.messages.head}
          {': '}
        </span>
        {<InfoLink wId={this.extra.head.id} label={this.extra.head.label} />}
      </p>
    );
  }

  @computed get capital() {
    if (
      this.pinned === false
      || this.extra.capital === undefined
      || this.extra.capital.length === 0) return null;
    return (
      <p>
        <span className='factSubTitle'>
          {this.messages.capital}
          {': '}
        </span>
        {this.extra.capital.map((c, idx, arr) => (
          <span>
            <InfoLink key={c.id} wId={c.id} label={c.label} />
            {idx + 1 < arr.length ? ', ' : ''}
          </span>
        ))}
      </p>
    );
  }

  render() {
    return (
      <div className='factInner'>
        {this.factHeader}
        {this.subTitleMessage}
        {this.government}
        {this.capital}
        {this.head}
        {this.population}
        {this.images}
      </div>
    );
  }
}

export default CountryHover;
