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

export const PersonFact = ({ person, type }) => (
  <div
    key={`person_${type}_${person.id}`}
  >
    <div className='factTest'>
      <h5 className='factHeader'> {type === 'birth' ? 'Рождение' : 'Смерть'} {person.nameRus} </h5>
      <h5 className='factDate'>
        {person.birthDate ? person.birthDate : '????'} <br /> {person.deathDate ? person.deathDate : '????'}
      </h5>
    </div>
  </div>
);


export const getInventors = (persons, inventors) => inventors.reduce((prev, p) =>
  (typeof persons[p] === 'undefined'
    ? prev
    : [...prev, persons[p].nameRus]), []);

export const Invention = ({ fact, persons }) => (
  <div key={`in_${fact.id}`}>
    <div>
      <h5 className='factHeader'>{fact.nameRus}</h5>
      <h5 className='factDate'> {fact.inventDate} </h5>
    </div>
    <br />
    <div className='factDescription'>
      {fact.description.replace(/\u00a0/g, ' ')}
    </div>
    <p className='factAuthor'>
      <i>{getInventors(persons, fact.inventor).join(', ')}
      </i>
    </p>
  </div>
);
