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
import PropTypes from 'prop-types';

import { Tooltip } from '../Input';

class FatButton extends React.Component {
  get classes() {
    const classes = [];
    if (this.props.active === true) {
      classes.push('active');
    }
    if (this.props.disabled === true) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }

  render() {
    return (
      <Tooltip placement='left' content={this.props.text}>
        <button
          onClick={() => this.props.cb()}
          className={this.classes}
          type='button'
          // disabled={this.props.disabled}
        >
          <i className={`lnr ${this.props.icon}`} />
        </button>
      </Tooltip>
    );
  }
}

FatButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired
};

export default FatButton;
