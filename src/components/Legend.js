import React from 'react';
import { connect } from 'react-redux';
import Fact from './Fact';


const Legend = ({ facts, persons }) => (
  <div className='legend'>
    {facts.current.map(year => year.map(factId =>
      <Fact fact={facts.byId[factId]} persons={persons} />
     ))}
  </div>
);

function mapStateToProps(state) {
  return { facts: state.timeline.facts, persons: state.timeline.persons };
}

export default connect(mapStateToProps)(Legend);
