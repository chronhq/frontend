import React from 'react';

const GeoEvent = ({ fact }) => (
  <div className='factInner'>
    <p className='factTitle'>
      {fact.title}
    </p>
    <p className='factDescription'>
      {fact.description}
    </p>
    <p className='factDate'>
      {fact.date}
    </p>
  </div>
);

export default GeoEvent;
