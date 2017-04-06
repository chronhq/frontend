import React from 'react';

const Fact = ({ fact, persons }) => (
  <div
    className='factStillInFuture'
    key={fact.id}
  >
    <span >
      <h5 className='factHeader'>{fact.name_rus}</h5>
      <span className='factDate'>
        {fact.invent_date}
      </span>
    </span>
    <br />
    <span>{fact.description}</span>
    <p className='factAuthor'>
      <i>{fact.inventor.map(p => persons[p].name_rus).join(', ')}</i>
    </p>
  </div>
);
export default Fact;
