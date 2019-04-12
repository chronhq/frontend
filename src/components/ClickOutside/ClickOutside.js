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

import './ClickOutside.less';

class ClickOutside extends React.Component {
  handleOverlay(e) {
    if (e.keyCode === 13) {
      this.props.close(e);
    }
  }

  clickOutside(e) {
    if (this.props.modal.current.contains(e.target)) {
      return;
    }
    this.props.close(e);
  }

  render() {
    return (
      <div
        className='black-overlay'
        role='button'
        tabIndex='0'
        onClick={e => this.clickOutside(e)}
        onKeyUp={e => this.handleOverlay(e)}
      >
        {this.props.children}
      </div>
    );
  }
}

ClickOutside.propTypes = {
  close: PropTypes.any.isRequired,
  modal: PropTypes.any.isRequired
};

export default ClickOutside;
