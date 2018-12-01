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
import PropTypes from 'prop-types';
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import './Event.less';

const Event = ({ event, currentTick, cb }) => {
  const entryClassname = (currentTick === event.tick)
    ? ['timeline__entry', 'timeline__entry--selected'].join(' ')
    : ['timeline__entry'].join(' ');
  return (
    <div>
      <div
        role="button"
        key={`event_${event.id}`}
        onClick={() => cb(event.tick)}
        className={entryClassname}
      >
        <div className='timeline__circle' />
        <div className="timeline__heading">
          {' '}
          {event.year}
          {' '}
        </div>
        <div className='timeline__title'>
          {' '}
          {event.title}
          {' '}
        </div>
        <div className='timeline__text'>
          {' '}
          {event.description}
          {' '}
        </div>
      </div>
    </div>
  );
};


Event.propTypes = {
  event: PropTypes.object.isRequired,
  currentTick: PropTypes.number.isRequired,
  cb: PropTypes.func.isRequired
};

export default Event;
