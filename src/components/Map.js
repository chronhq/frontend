import { connect } from 'react-redux';
import React from 'react';
import Area from './Area';
import Pin from './Pin';


const Map = ({ areas, facts, cities }) => (
  <svg className='svgMap' >
    <g strokeWidth="0.6" >
      {areas.map(area => <Area d={area.d} label={area.label} color={area.color} id={area.id} />)}
    </g>
    {facts.current.map(year =>
      year.map(fact =>
        facts.byId[fact].location.map(locationId =>
          <g><Pin location={cities[locationId]} /></g>)))}
  </svg>
);
function mapStateToProps(state) {
  return { facts: state.timeline.facts, areas: state.terrain, cities: state.timeline.cities };
}

export default connect(mapStateToProps)(Map);
