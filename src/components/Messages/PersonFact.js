import React from 'react';

const PersonFact = ({ person }) => (
  <div key={person.key}>
    <p className='factTitle'>
      {person.title}
    </p>
    <p className='factHeader'>
      {person.occasion}
    </p>
    <p className='factDate'>
      {person.birthDate}
      <br />
      {person.deathDate}
    </p>
    <p className='factDescription'>
      {person.location}
    </p>
  </div>
);

export default PersonFact;
