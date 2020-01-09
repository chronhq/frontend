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
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import './AdminTESearchBar.less';
import { ActionButtonFill } from '../ActionButtons/ActionButtons';

@observer
class AdminTESearchBar extends React.Component {
  @observable value = '';

  input = action((e) => {
    this.value = e.target.value;
  })

  search = () => {
    this.props.search(this.value);
  }

  render() {
    return (
      <div className='te-search'>
        <input
          className='text-input input-text'
          type={this.props.type}
          value={this.value}
          onChange={this.input}
          onKeyPress={(e) => e.key === 'Enter' && this.search()}
        />
        <ActionButtonFill
          click={this.search}
          text='Search'
          icon='search--light'
          style={{ borderRadius: '0 2px 2px 0' }}
        />
      </div>
    );
  }
}

AdminTESearchBar.defaultProps = {
  type: 'text',
  search: (e) => console.log('Search button pressed', e),
};

AdminTESearchBar.propTypes = {
  type: PropTypes.string,
  search: PropTypes.func,
};

export default AdminTESearchBar;
