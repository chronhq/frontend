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

const InfoLink = ({ uri, label = null }) => (
  <a
    className='message-text--light'
    href={uri}
    target='_blank'
    rel='noopener noreferrer'
  >
    {label !== null ? label : uri}
  </a>
);

export { InfoLink };

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
    return this.props.store.wikidata.cache[this.props.data.wikidata_id].current;
  }

  @computed get base() {
    return this.wikidata === undefined
      ? {
        title: this.props.data.wikidata_id,
        subTitle: this.props.store.i18n.data.loading
      }
      : {
        title: this.wikidata.country.label,
        subTitle: '', // TODO add subtitle based on Political Relations
        government: this.wikidata.form,
      };
  }

  @computed get extra() {
    return this.wikidata === undefined
      ? {}
      : {
        flag: this.wikidata.flag,
        emblem: this.wikidata.country.emblem,
        capital: this.wikidata.capital,
        head: this.wikidata.head,
        population: this.wikidata.population,
      };
  }

  @computed get factHeader() {
    return (
      <div className='message-text--header'>
        {this.base.title}
      </div>
    );
  }

  @computed get subTitleMessage() {
    return this.base.title === this.base.subTitle ? '' : (
      <div>
        {this.base.subTitle}
      </div>
    );
  }

  @computed get images() {
    if (this.pinned === false) return null;
    const img = (i) => (
      <img
        className='message-fact__country-flags'
        src={i}
        alt=''
      />
    );
    return (
      <div className='message-fact__country-flags'>
        {this.extra.flag !== undefined && img(this.extra.flag.uri)}
        {this.extra.emblem !== undefined && img(this.extra.emblem.value)}
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
    const pop = new Intl.NumberFormat().format(this.extra.population.population);
    return (
      <div className='message-fact__row'>
        <div className='message-text--body '>
          {this.messages.population}
          {': '}
        </div>
        {pop}
      </div>
    );
  }

  @computed get head() {
    if (this.pinned === false || this.extra.head === undefined) return null;
    if (this.extra.head.uri === undefined && this.extra.head.label === undefined) return null;
    return (
      <div className='message-fact__row'>
        <div className='message-text--body '>
          {this.messages.head}
          {': '}
        </div>
        <InfoLink uri={this.extra.head.uri} label={this.extra.head.label} />
      </div>
    );
  }

  @computed get capital() {
    if (
      this.pinned === false
      || this.extra.capital === undefined
      || !this.extra.capital.length) return null;
    return (
      <div className='message-fact__row'>
        <div className='message-text--body '>
          {this.messages.capital}
          {': '}
        </div>
        {this.extra.capital.map((c, idx, arr) => (
          <div key={`${encodeURI(c.uri)}`}>
            <InfoLink uri={c.uri} label={c.label} />
            {idx + 1 < arr.length ? ', ' : ''}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <>
        {this.factHeader}
        {this.subTitleMessage}
        {this.government}
        {this.capital}
        {this.head}
        {this.population}
        {this.images}
      </>
    );
  }
}

export default CountryHover;
