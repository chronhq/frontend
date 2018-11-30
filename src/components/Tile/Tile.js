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
import { Link } from 'react-router-dom';

import './Tile.less';

function isOdd(n) {
  return Math.abs(n % 2) === 1;
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
const Tile = ({ course, lng }) => (
  <div className={isOdd(course.id) ? 'tile odd' : 'tile'}>
    {/*
  <div className='tile-wrapper'>
*/}
    <div className='tile-left' />
    <div className='tile-center'>
      <Link to={`${course.url}`}>
        <div className='tile__content'>
          <h3 className='tile__title'>
            {' '}
            {course.name[lng]}
            {' '}
          </h3>
          <p className='tile__description'>
            {course.description[lng]}
          </p>
        </div>
      </Link>
    </div>
    <div className='tile-right' />
  </div>
);

export default Tile;
