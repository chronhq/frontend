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

// language, properties, type

@inject('store')
@observer
class CountryHover extends React.Component {
  type = 'No Type';

  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  @computed get selectors() {
    return this.props.store.i18n.data.selectors;
  }

  @computed get properties() {
    return this.props.store.spaceTimeVolume.data[this.props.id].values;
  }

  @computed get name() {
    return this.properties.title;
  }

  @computed get admin() {
    return this.properties.subTitle;
  }

  @computed get short() {
    return (
      <p>
        {' ['}
        {this.type}
        {']'}
      </p>
    );
  }

  @computed get long() {
    if (this.type === null) {
      // for ainu course
      return (
        <p>
          {this.admin}
        </p>
      );
    }

    return (
      <p>
        {this.admin}
        {' ['}
        {this.type}
        {']'}
      </p>
    );
  }

  @computed get message() {
    if (this.name === this.admin && this.admin !== '') {
      return this.short;
    }
    return this.long;
  }


  render() {
    return (
      <div className='factInner'>
        <p className='factHeader'>
          {this.name}
        </p>
        {this.message}
      </div>
    );
  }
}

export default CountryHover;
