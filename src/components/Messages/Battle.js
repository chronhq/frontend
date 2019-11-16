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
    <p className='message-fact__date'>
      {fact.date}
    </p>
    <p className='message-fact__title'>
      {fact.label}
    </p>
    <p className='message-fact__description'>
      {fact.description}
    </p>
    {fact.participant !== undefined
      ? (
        <p className='message-fact__description'>
          {`${i18n.participants}: `}
          <i>
            {Object.values(fact.participant).join(', ')}
          </i>
        </p>
      )
      : null}
    {fact.image !== undefined
      ? (
        <div className='message-fact__image'>
          <img
            className='message-fact__image'
            src={fact.image}
            alt={fact.image}
          />
        </div>
      )
      : null}
  </div>
);

export default Battle;
