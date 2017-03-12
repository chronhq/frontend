import React from 'react';

const Fact = ({ fact, persons }) => (
  <div
    className={fact.completed ? 'factAlreadyOccured' : 'factStillInFuture'}
    key={fact.id}
  >
    <span className='factHeader'>
      <b>{fact.nameRu}</b>
      <span className='factDate'>
        {fact.date}
      </span>
    </span>
    <br />
    <span>{fact.description}</span>
    <p className='factAuthor'>
    <i>{fact.PersId.map(p => persons[p].nameRu).join(', ')}</i></p>
    <hr />
  </div>
);
export default Fact;
