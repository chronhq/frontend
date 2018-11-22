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
