import { connect } from 'react-redux';
import React from 'react';
import Area from './Area';
import Pin from './Pin';


const Map = ({ terrain, currentCities, locations, borders, territories }) => (
  <svg className='svgMap' transform="scale(0.7)">
    <g strokeWidth="0.6" >
      {terrain.map(area => <Area d={area.d} label={area.label} color={area.color} id={area.id} />)}
    </g>
    <g>
      {currentCities.map(city =>
        <Pin location={locations[city]} />)}
    </g>
    <g>
      {borders.current.map(id =>
        <Area
          id={territories[borders.assigment[id]].id} d={borders.byId[id].d}
          color={territories[borders.assigment[id]].color}
          label={territories[borders.assigment[id]].name} opacity='0.6'
        />
      )}
    </g>
  </svg>
);
function mapStateToProps(state) {
  return { terrain: state.terrain,
    currentCities: state.timeline.locations.current,
    locations: state.locations,
    borders: {
      current: state.timeline.borders.current,
      byId: state.borders,
      assigment: state.borderAssigment
    },
    territories: state.territories
  };
}

export default connect(mapStateToProps)(Map);
