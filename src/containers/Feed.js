import React from 'react';
import { connect } from 'react-redux';
import Fact from '../components/Fact';

import './Feed.less';

const Feed = ({ facts, currentFacts, persons }) => (
  <div className='feed'>
    {currentFacts.map(year => year.map(factId =>
      <Fact fact={facts.byId[factId]} persons={persons.byId} />
     ))}
  </div>
);

function mapStateToProps(state) {
  return { facts: state.facts, currentFacts: state.timeline.facts.current, persons: state.persons };
}

export default connect(mapStateToProps)(Feed);
