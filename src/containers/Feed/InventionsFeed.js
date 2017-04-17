import React from 'react';

export const getInventors = (persons, inventors) => inventors.reduce(
  (prev, p) => (typeof persons[p] === 'undefined' ? prev : [...prev, persons[p].name_rus]), []
);

const Invention = ({ fact, persons }) => (
  <div key={`in_${fact.id}`}>
    <span >
      <h5 className='factHeader'>{fact.name_rus}</h5>
      <span className='factDate'>
        {fact.invent_date}
      </span>
    </span>
    <br />
    <span>{fact.description}</span>
    <p className='factAuthor'>
      <i>{getInventors(persons, fact.inventor).join(', ')}
      </i>
    </p>
  </div>
);

const InventionsFeed = ({ persons, inventions, current, selected, hoverCb, changeCb }) => (
  <div className='InventionsFeed'>{current.map(year => year.map(invId =>
    <div
      key={`div_inv_${invId}`}
      onMouseEnter={() => hoverCb(invId)}
      onMouseLeave={() => hoverCb(null)}
      onClick={() => changeCb({ [invId]: !selected[invId] })}
      className={selected[invId] === true
        ? 'selectedFact' : 'regularFact'}
    >
      <Invention fact={inventions.byId[invId]} persons={persons.byId} />
    </div>
  ))}
  </div>
);

export default InventionsFeed;
