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

import './NarrativeEvent.less';
import truncateText from '../../containers/Article/truncate';

const NarrativeEvent = ({ event, currentTick, cb }) => (
  <div
    role='button'
    tabIndex={0}
    onClick={() => cb(event.tick)}
    onKeyPress={() => cb(event.tick)}
    className={`nevent ${(currentTick === event.tick) ? 'nevent__selected' : ''}`}
  >
    <div className='nevent--title'>
      <b>
        {event.title}
      </b>
    </div>
    <div className='nevent--dates'>
      {event.year}
    </div>
    <div className='nevent--paragraph'>
      {truncateText(event.description)}
    </div>
  </div>
);

export default NarrativeEvent;
