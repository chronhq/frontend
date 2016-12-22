import { connect } from 'react-redux';
import React from 'react';
import Area from './Area';
import Pin from './Pin';


const Map = ({ areas, facts }) => (
  <svg className='svgMap' >
    <g strokeWidth="0.6" >
      {areas.map(area => <Area d={area.d} label={area.label} color={area.color} id={area.id} />)}
    </g>
    {facts.map(fact =>
        fact.location.map(location =>
          <g><Pin location={location} visible={fact.completed} /></g>))}
  </svg>
);
function mapStateToProps(state) {
  return { facts: state.timeline.facts, areas: state.terrain };
}

export default connect(mapStateToProps)(Map);
