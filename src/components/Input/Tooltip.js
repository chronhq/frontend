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
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';

import './Tooltip.less';

const Component = ({
  children, placement, dark, content
}) => (
  <Tooltip
    placement={placement}
    trigger={['hover']}
    overlay={() => (
      <span>
        {content}
      </span>
    )}
    overlayClassName={dark ? 'rc-tooltip-dark' : ''}
  >
    {children}
  </Tooltip>
);

Component.defaultProps = {
  placement: 'left',
  dark: false
};

Component.propTypes = {
  children: PropTypes.element.isRequired,
  placement: PropTypes.string,
  dark: PropTypes.bool,
  content: PropTypes.string.isRequired
};

export default Component;
