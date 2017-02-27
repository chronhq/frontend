import React from 'react';
import { connect } from 'react-redux';
import Fact from '../components/Fact';


const Legend = ({ facts, currentFacts, persons }) => (
  <div className='legend'>
    {currentFacts.map(year => year.map(factId =>
      <Fact fact={facts.byId[factId]} persons={persons.byId} />
     ))}
  </div>
);

function mapStateToProps(state) {
  return { facts: state.facts, currentFacts: state.timeline.facts.current, persons: state.persons };
}

export default connect(mapStateToProps)(Legend);
