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
    const message = this.props.store.deck.loadingStatus
      ? this.props.store.i18n.data.loadingWidget.loaded
      : this.props.store.i18n.data.loadingWidget.loading;
    return (
      <g className='sizeMeter' transform='translate(0,-40)' strokeWidth="1" stroke='black'>
        <text stroke='transparent'>
          {message}
        </text>
      </g>
    );
  }
}

export default LoadingWidget;
