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
    return this.props.store.pins.pinned;
  }

  @computed get values() {
    try {
      return this.props.store.spaceTimeVolume.data[this.props.id].values;
    } catch (e) {
      console.error('Unable to get values for Country Hover', this.props.id, e);
      return {};
    }
  }

  @computed get title() {
    return this.values.title;
  }

  @computed get factHeader() {
    return (
      <p className='factHeader'>
        {this.title}
      </p>
    );
  }

  @computed get subTitle() {
    return this.values.subTitle;
  }

  @computed get subTitleMessage() {
    return this.title === this.subTitle ? '' : (
      <p>
        {this.subTitle}
      </p>
    );
  }

  @computed get flag() {
    return this.values.flag;
  }

  @computed get emblem() {
    return this.values.emblem;
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
        {this.flag !== undefined && img(this.flag)}
        {this.emblem !== undefined && img(this.emblem)}
      </div>
    );
  }

  @computed get government() {
    return this.values.government === undefined ? '' : (
      <p>
        {this.values.government.label}
      </p>
    );
  }

  @computed get population() {
    if (this.pinned === false || this.values.population === undefined) return null;
    const pop = new Intl.NumberFormat().format(this.values.population.amount);
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
    if (this.pinned === false || this.values.head === undefined) return null;
    return (
      <p>
        <span className='factSubTitle'>
          {this.messages.head}
          {': '}
        </span>
        {<InfoLink wId={this.values.head.id} label={this.values.head.label} />}
      </p>
    );
  }

  @computed get capital() {
    if (this.pinned === false || this.values.capital === undefined) return null;
    const { deJure, deFacto } = this.values.capital;
    if (deJure === undefined && deFacto === undefined) return null;
    return (
      <p>
        <span className='factSubTitle'>
          {this.messages.capital}
          {': '}
        </span>
        {(deJure !== undefined) && <InfoLink wId={deJure.id} label={deJure.label} />}
        {(deFacto !== undefined) && <InfoLink wId={deFacto.id} label={deFacto.label} />}
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
