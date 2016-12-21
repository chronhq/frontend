import React from 'react';
import Fact from './Fact';

const Legend = ({ facts }) => (
  <div className='legend'>
    {facts.map(fact => <Fact fact={fact} />)}
  </div>
)
export default Legend
