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
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class LoadingLogo extends Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          zIndex: '199'
        }}
      >
        <img
          src={this.props.store.i18n.logo}
          alt='logo'
          style={{ width: '300px' }}
        />
        <h5>
          {this.props.store.i18n.data.loading}
        </h5>
      </div>
    );
  }
}

export default LoadingLogo;
