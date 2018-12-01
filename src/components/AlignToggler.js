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
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('store')
@observer
class AlignToggler extends React.Component {
  @observable value = 'right';

  @action handleChange(event) {
    this.value = event.target.value;
  }

  @action handleSubmit(event) {
    event.preventDefault();
    this.props.store.flags.runtime.set('alignPanel', this.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <select placeholder="select" onChange={e => this.handleChange(e)}>
            <option value='right'>
              { 'Right' }
            </option>
            <option value='left'>
              { 'Left' }
            </option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AlignToggler;
