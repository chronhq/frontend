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

const TwoActions = ({
  children,
}) => {
  const [left, right] = children;
  return (
    <div className='two-actions__container'>
      <div className='two-actions'>
        <div className='two-actions--left'>
          {left}
        </div>
        <div className='two-actions--right'>
          {right}
        </div>
      </div>
    </div>
  );
};

TwoActions.propTypes = {
  children: PropTypes.array.isRequired
};

export default TwoActions;
