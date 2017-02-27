import React from 'react';

const Fact = ({ fact, persons }) => (
  <div
    className={fact.completed ? 'factAlreadyOccured' : 'factStillInFuture'}
    key={fact.id}
  >
    <span className='factHeader'>
      <b>{fact.name}</b>
      <span className='factDate'>
        `${fact.date}`
      </span>
    </span>
    <br />
    <span>{fact.description}</span>
    <span className='factAuthor'> by <i>{fact.PersId.map(p => persons[p].name).join(', ')}</i></span>
    <hr />
  </div>
);
export default Fact;
