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

const width = b => (b ? { width: '100%' } : {});

const AdminFooterLinks = ({ left, right, rightIsLonger }) => (
  <div className='footerLinks'>
    <div className='adminFooter'>
      {left && (
        <span style={width(!rightIsLonger)} className='leftFooter'>
          {left}
        </span>
      )}
      {right && (
        <span style={width(rightIsLonger)} className='rightFooter'>
          {right}
        </span>
      )}
    </div>
  </div>
);

AdminFooterLinks.defaultProps = {
  rightIsLonger: false,
  left: null,
  right: null,
};

AdminFooterLinks.propTypes = {
  rightIsLonger: PropTypes.bool,
  left: PropTypes.string,
  right: PropTypes.string,
};

export default AdminFooterLinks;
