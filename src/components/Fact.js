import React from 'react';

const Fact = ({ fact }) => (
  <div
    className={fact.completed ? 'factAlreadyOccured' : 'factStillInFuture'}
    key={fact.id}
  >
    <span className='factHeader'>
      <b>{fact.name}</b>
      <span className='factDate'>
        {fact.day !== undefined ? `${fact.year}-${fact.month}-${fact.day}` : fact.year}
      </span>
    </span>
    <br />
    <span>{fact.description}</span>
    <span className='factAuthor'> by <i>{fact.authors.join(', ')}</i></span>
    <hr />
  </div>
);
export default Fact;
