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

import Tooltip from '../Tooltip/Tooltip';

import './LayerToggleSummer.less';

const LayerToggle = ({
  checked, name, tooltip, click, place, extraClassName = '', extraStyle = {}
}) => {
  const className = [
    'image-button',
    `image-button${checked ? '__checked' : ''}`,
    `image-button-${name}`,
    extraClassName,
  ].join(' ');
  const toggle = () => click({ payload: { [name]: !checked }, place });
  return (
    <Tooltip placement='left' content={tooltip}>
      <div
        role='button'
        className='round-button'
        tabIndex={0}
        onKeyPress={toggle}
        onClick={toggle}
      >
        <div
          style={extraStyle}
          className={className}
        />
      </div>
    </Tooltip>
  );
};

LayerToggle.propTypes = {
  // id: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  // label: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

export default LayerToggle;
