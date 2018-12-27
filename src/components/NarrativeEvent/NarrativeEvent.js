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
