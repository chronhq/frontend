import React from 'react';

export const GeoEvent = ({ fact }) => (
  <div className='factInner'>
    <p className='ballon-title'>
      Справка
    </p>
    <p className='factDescription'>
      {fact.description}
    </p>
    <p className='factDate'>
      {fact.date}
    </p>
  </div>
);

export const PersonFact = ({ person }) => (
  <div key={person.key}>
    <p className='ballon-title'>
      Люди
    </p>
    <p className='factHeader'>
      {person.occasion}
    </p>
    <p className='factDate'>
      {person.birthDate}
      <br />
      {person.deathDate}
    </p>
  </div>
);

export const Invention = ({ fact }) => (
  <div key={fact.key}>
    <p className='ballon-title'>
      Изобретения
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
      <i>
        {fact.inventors}
      </i>
    </p>
  </div>
);
