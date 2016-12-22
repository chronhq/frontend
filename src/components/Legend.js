import React from 'react';
import { connect } from 'react-redux';
import Fact from './Fact';


const Legend = ({ facts }) => (
  <div className='legend'>
    {facts.map(fact => <Fact fact={fact} />)}
  </div>
);

function mapStateToProps(state) {
  return { facts: state.timeline.facts };
}

export default connect(mapStateToProps)(Legend);
