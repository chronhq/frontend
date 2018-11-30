import React from 'react';

const Invention = ({ fact }) => (
  <div key={fact.key}>
    <p className='factTitle'>
      {fact.title}
    </p>
    <p className='factHeader'>
      {fact.name}
    </p>
    <p className='factDescription'>
      {fact.description}
    </p>
    <p className='factDate'>
      {fact.inventDate}
    </p>
    <p className='factAuthor'>
      {fact.inventors}
    </p>
  </div>
);

export default Invention;
