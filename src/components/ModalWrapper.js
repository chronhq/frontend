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
import useOnClickOutside from 'use-onclickoutside';
import PropTypes from 'prop-types';

const ClickOutside = ({
  close, children, style, isOpen, className
}) => {
  const ref = React.useRef(null);
  useOnClickOutside(ref, close);
  return isOpen
    ? (
      <div ref={ref} style={style} className={className}>
        {children}
      </div>
    )
    : null;
};

ClickOutside.defaultProps = {
  style: {},
  className: '',
};

ClickOutside.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default ClickOutside;
