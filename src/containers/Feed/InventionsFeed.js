import React from 'react';
import { Row } from 'react-bootstrap';

export const getInventors = (persons, inventors) => inventors.reduce(
  (prev, p) => (typeof persons[p] === 'undefined' ? prev : [...prev, persons[p].name_rus]), []
);

const Invention = ({ fact, persons }) => (
  <div key={`in_${fact.id}`}>
      <div>
        <h5 className='factHeader'>{fact.name_rus}</h5>
        <h5 className='factDate'> {fact.invent_date} </h5>
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
