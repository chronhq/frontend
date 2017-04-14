import React from 'react';

const PersonFact = ({ person, fact }) => (
  <div
    className='factStillInFuture'
    key={`pf_${fact.id}`}
  >
    <span>{person.name_rus}</span>
    <span className='factDate'>
      {person.birth_date ? person.birth_date : '????'} - {person.death_date ? person.death_date : '????'}
    </span>
  </div>
);
const PersonsFeed = ({ persons, current, selected, hoverCb, changeCb }) => (
  <div className='PersonsFeed'>
    {['birth', 'death'].map(type =>
      <div key={`persons_feed_${type}`}>
        <h5 className='factHeader'>
          {type === 'birth' ? 'Родились' : 'Умерли'}
        </h5>
        <ul>
          {current[type].map(perFact =>
            <li
              key={`div_per_${perFact.id}`}
              onMouseEnter={() => hoverCb(persons.byId[perFact.person][`${type}_place`])}
              onMouseLeave={() => hoverCb(null)}
              onClick={() => changeCb({ [perFact.id]: !selected[perFact.id] })}
              className={selected[perFact.id] === true
                ? 'selectedFact' : 'regularFact'}
            >
              <PersonFact person={persons.byId[perFact.person]} fact={perFact} />
            </li>
        )}
        </ul>
      </div>
    )}
  </div>
);

export default PersonsFeed;
