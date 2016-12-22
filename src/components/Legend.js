import React from 'react';
import Fact from './Fact';
import { connect } from 'react-redux'


const Legend = ({ facts }) => (
  <div className='legend'>
    {facts.map(fact => <Fact fact={fact} />)}
  </div>
)

function mapStateToProps (state) {
  return {facts: state.timeline.facts}
}

export default connect(mapStateToProps)(Legend)
