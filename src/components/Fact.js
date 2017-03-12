import React from 'react';

const Fact = ({ fact, persons }) => (
  <div
    className='factStillInFuture'
    key={fact.id}
  >
    <span >
      <h5 className='factHeader'>{fact.nameRu}</h5>
      <span className='factDate'>
        {fact.date}
      </span>
    </span>
    <br />
    <span>{fact.description}</span>
    <p className='factAuthor'>
    <i>{fact.PersId.map(p => persons[p].nameRu).join(', ')}</i></p>
  </div>
);
export default Fact;
