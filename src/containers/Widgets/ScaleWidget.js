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
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';

@inject('store')
@observer
class ScaleWidget extends React.Component {
  @observable milesInKm = 0.621371;

  @computed get scaleRaw() {
    return this.props.store.deck.metersPerPixel / 10;
  }

  @computed get scaleWidget() {
    switch (this.props.store.i18n.lng) {
      case 'ru':
        return {
          value: Math.round(this.scaleRaw),
          units: 'Km'
        };
      default:
        return {
          value: Math.round(this.scaleRaw * this.milesInKm),
          units: 'Miles'
        };
    }
  }

  render() {
    const scale = this.scaleWidget;
    return (
      <g className='sizeMeter' strokeWidth="1" stroke='black'>
        <line x1="0" y1="0" x2="100" y2="0" />
        <line x1="0" y1="0" x2="0" y2="-5" />
        <line x1="100" y1="0" x2="100" y2="-5" />
        <text transform="translate(20, -5)" stroke='transparent'>
          {scale.value}
          {' '}
          {scale.units}
        </text>
      </g>
    );
  }
}

export default ScaleWidget;
