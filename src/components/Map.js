import { connect } from 'react-redux';
import React from 'react';
import Area from './Area';
import Pin from './Pin';


const Map = ({ areas, currentCities, locations }) => (
  <svg className='svgMap' >
    <g strokeWidth="0.6" >
      {areas.map(area => <Area d={area.d} label={area.label} color={area.color} id={area.id} />)}
    </g>

    {currentCities.map(city =>
      <g><Pin location={locations[city]} /></g>)}
  </svg>
);
function mapStateToProps(state) {
  return { areas: state.terrain,
    currentCities: state.timeline.locations.current,
    locations: state.locations };
}

export default connect(mapStateToProps)(Map);
