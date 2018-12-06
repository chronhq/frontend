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

const Battle = ({ fact }) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return (
    <div key={fact.key}>
      <p className='factDate'>
        {fact.pointInTime.toLocaleString('en-US', options)}
      </p>
      <p className='factTitle'>
        {fact.label}
      </p>
      <p className='factDescription'>
        {fact.description}
      </p>
      {fact.participant !== undefined
        ? (
          <p className='factDescription'>
            {'Participants: '}
            <i>
              {Object.values(fact.participant).map(value => value.label).join(', ')}
            </i>
          </p>
        )
        : null
      }
      {fact.image !== undefined
        ? (
          <img
            className='factImageDemo'
            src={fact.image.thumburl}
            alt=''
          />
        )
        : null
      }
    </div>
  );
};

export default Battle;
