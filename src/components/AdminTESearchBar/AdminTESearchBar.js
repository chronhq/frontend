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

  search = () => {
    this.props.search(this.value);
  }

  @action input(e) {
    this.value = e;
  }

  render() {
    return (
      <div className='te-search'>
        <input
          type={this.props.type}
          value={this.value}
          onChange={e => this.input(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && this.search()}
        />
        <ActionButtonFill click={this.search} text='Search' icon='search--light' />
      </div>
    );
  }
}

AdminTESearchBar.defaultProps = {
  type: 'number',
  search: e => console.log('Search button pressed', e),
};

AdminTESearchBar.propTypes = {
  type: PropTypes.string,
  search: PropTypes.func,
};

export default AdminTESearchBar;
