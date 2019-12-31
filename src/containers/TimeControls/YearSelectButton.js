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

@inject('store')
@observer
class YearButton extends React.Component {
  @computed get year() {
    return this.props.store.year;
  }

  @computed get invalid() {
    return this.year.tuneIsValid ? '' : 'time-controls__input--invalid';
  }

  handlePress = (event) => {
    switch (event.key) {
      case 'Enter':
        if (this.year.tuneIsValid) {
          this.year.saveTuneValue();
        }
        break;
      case 'ArrowUp':
        this.year.setTuneValue(this.year.tuneValueG + 1);
        break;
      case 'ArrowDown':
        this.year.setTuneValue(this.year.tuneValueG - 1);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <input
        type="text"
        pattern="[0-9]*"
        min={this.year.limits.min}
        max={this.year.limits.max}
        value={this.year.tuneValueG}
        onChange={(event) => this.year.setTuneValue(event.target.value)}
        onKeyDown={this.handlePress}
        className={`time-controls__year controls-text-shadow time-controls__input ${this.invalid}`}
      />
    );
  }
}

export default YearButton;
