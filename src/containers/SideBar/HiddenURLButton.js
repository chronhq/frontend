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

import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);

class HiddenURLButton extends React.Component {
  render() {
    return (
      <LayerToggle
        key={`layer_${this.props.name}`}
        tooltip={capitalizeFirstLetter(this.props.name)}
        extraClassName={this.props.styles}
        wrapper={this.props.wrapper}
        name={this.props.name}
        click={() => this.ref.click()}
      >
        <a
          href={this.props.href}
          target='_blank'
          rel='noopener noreferrer'
          ref={(r) => { this.ref = r; return false; }}
          style={{ visibility: 'hidden', position: 'absolute' }}
        >
          {`Link to ${this.props.name}`}
        </a>
      </LayerToggle>
    );
  }
}

HiddenURLButton.defaultProps = {
  styles: '',
  wrapper: '',
};

HiddenURLButton.propTypes = {
  name: PropTypes.string.isRequired,
  styles: PropTypes.string,
  wrapper: PropTypes.string,
  href: PropTypes.string.isRequired,
};

export default HiddenURLButton;
