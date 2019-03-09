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

@inject('store')
@observer
class LoadingWidget extends React.Component {
  render() {
    return this.props.store.deck.loadingStatus
      ? null
      : (
        <g className='sizeMeter' transform='translate(-5, 0)' strokeWidth="1" stroke='black'>
          <text style={{ userSelect: 'none' }} stroke='transparent'>
            {this.props.store.i18n.data.loadingWidget.loading}
          </text>
        </g>
      );
  }
}

export default LoadingWidget;
