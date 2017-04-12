import React from 'react';

const PersonFact = ({ person, fact }) => (
  <div
    className='factStillInFuture'
    key={`pf_${person.id}`}
  >
    <span>
      {fact.type === 'born'
        ? 'Родился' // Потерпел
        : 'Умер' } {person.name_rus}
    </span>
  </div>
);
const PersonsFeed = ({ persons, current, selected, hoverCb, changeCb }) => (
  <div className='PersonsFeed'>{current.map(perFact =>
    <div
      key={`div_per_${perFact.id}`}
      onMouseEnter={() => hoverCb(persons.byId[perFact.id].birth_place)}
      onMouseLeave={() => hoverCb(null)}
      onClick={() => changeCb({ [perFact.id]: !selected[perFact.id] })}
      className={selected[perFact.id] === true
        ? 'selectedFact' : 'regularFact'}
    >
      <PersonFact person={persons.byId[perFact.id]} fact={perFact} />
    </div>
  )}
  </div>
);

export default PersonsFeed;
