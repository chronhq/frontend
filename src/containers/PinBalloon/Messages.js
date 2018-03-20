import React from 'react';

export const GeoEvent = ({ fact }) => (
  <div className='factTest'>
    <div>
      {fact.description}
    </div>
    <div>
      <h5 className='factDate'>{fact.date}</h5>
    </div>
  </div>
);

export const PersonFact = ({ person }) => (
  <div key={person.key}>
    <div className='factTest'>
      <h5 className='factHeader'> {person.occasion} </h5>
      <h5 className='factDate'>
        {person.birthDate} <br />
        {person.deathDate}
      </h5>
    </div>
  </div>
);

export const Invention = ({ fact }) => (
  <div key={fact.key}>
    <div>
      <h5 className='factHeader'>{fact.name}</h5>
      <h5 className='factDate'> {fact.inventDate} </h5>
    </div>
    <br />
    <div className='factDescription'>
      {fact.description}
    </div>
    <p className='factAuthor'>
      <i>{fact.inventors}</i>
    </p>
  </div>
);
