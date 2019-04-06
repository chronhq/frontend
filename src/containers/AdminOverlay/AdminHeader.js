/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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

import CloseButton from '../../components/Button/CloseButton';

@inject('store')
@observer
class AdminHeader extends React.Component {
  close = () => {
    this.props.store.flags.runtime.set('admin', false);
  }

  render() {
    return (
      <div className='adminHeader'>
        <h2>
          {this.props.title}
        </h2>
        <CloseButton onClick={this.close} />
      </div>
    );
  }
}

export default AdminHeader;