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
import './TwoActions.less';

/* eslint-disable jsx-a11y/anchor-is-valid */
const Button = ({
  click, text, position
}) => (text && (
  <a
    href=''
    onClick={(e) => {
      e.preventDefault();
      click();
      return false;
    }}
    className={position}
  >
    {text}
  </a>
));

const TwoActions = ({
  left, right, leftClick, rightClick
}) => (
  <div className='twoActionsContainer'>
    <div className='twoActions'>
      <Button position='leftFooter' text={left} click={leftClick} />
      <Button position='rightFooter' text={right} click={rightClick} />
    </div>
  </div>
);

TwoActions.defaultProps = {
  left: null,
  right: null,
  leftClick: () => false,
  rightClick: () => false,
};

TwoActions.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  leftClick: PropTypes.any,
  rightClick: PropTypes.any,
};

export default TwoActions;
