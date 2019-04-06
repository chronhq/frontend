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

/* eslint-disable jsx-a11y/anchor-is-valid */
const Button = ({
  click, text, primary, position
}) => (text && (
  <a
    href=''
    onClick={(e) => {
      e.preventDefault();
      click();
      return false;
    }}
    style={width(primary)}
    className={position}
  >
    {text}
  </a>
));

const AdminFooterLinks = ({
  left, right, leftClick, rightClick, rightIsLonger
}) => (
  <div className='adminFooterContainer'>
    <div className='adminFooter'>
      <Button position='leftFooter' text={left} click={leftClick} primary={!rightIsLonger} />
      <Button position='rightFooter' text={right} click={rightClick} primary={rightIsLonger} />
    </div>
  </div>
);

AdminFooterLinks.defaultProps = {
  rightIsLonger: false,
  left: null,
  right: null,
  leftClick: () => false,
  rightClick: () => false,
};

AdminFooterLinks.propTypes = {
  rightIsLonger: PropTypes.bool,
  left: PropTypes.string,
  right: PropTypes.string,
  leftClick: PropTypes.any,
  rightClick: PropTypes.any,
};

export default AdminFooterLinks;
