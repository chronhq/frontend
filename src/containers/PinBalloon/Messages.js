import React from 'react';

export const GeoEvent = ({ fact }) => (
  <div className='factTest'>
    <div>
      {fact.description}
    </div>
    <div>
      <p className='factDate'>
        {fact.date}
      </p>
    </div>
  </div>
);

export const PersonFact = ({ person }) => (
  <div key={person.key}>
    <div className='factTest'>
      <p className='factHeader'>
        {' '}
        {person.occasion}
        {' '}
      </p>
      <p className='factDate'>
        {person.birthDate}
        {' - '}
        {person.deathDate}
      </p>
    </div>
  </div>
);

export const Invention = ({ fact }) => (
  <div key={fact.key}>
    <div>
      <p className='factHeader'>
        {fact.name}
      </p>
    <div className='factDescription'>
      {fact.description}
    </div>
      <p className='factDate'>
        {' '}
        {fact.inventDate}
        {' '}
      </p>
    </div>
    <p className='factAuthor'>
      <i>
        {fact.inventors}
      </i>
    </p>
  </div>
);
