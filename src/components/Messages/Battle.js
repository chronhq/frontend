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

const Battle = ({ fact, i18n }) => (
  <div key={fact.key}>
    <p className='factDate'>
      {fact.dateText}
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
          {`${i18n.participants}: `}
          <i>
            {Object.values(fact.participant).join(', ')}
          </i>
        </p>
      )
      : null
    }
    {fact.image !== undefined
      ? (
        <div className='factImageDemo'>
          <img
            className='factImageDemo'
            src={fact.image.thumburl}
            alt={fact.image.title}
          />
        </div>
      )
      : null
    }
  </div>
);

export default Battle;
