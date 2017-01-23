import { connect } from 'react-redux';
import React from 'react';
import Area from './Area';
import Pin from './Pin';
import PinTooltip from './PinTooltip';


const Map = ({ terrain, currentCities, locations, borders, territories }) => (
  <svg className='svgMap' transform="scale(1)">
    <g strokeWidth="0.6" >
      {terrain.map(area => <Area d={area.d} label={area.label} color={area.color} id={area.id} />)}
    </g>
    <g>
      {currentCities.map(city =>
        <g>
          <Pin location={locations[city]} />
          <PinTooltip location={locations[city]} />
        </g>
      )}
    </g>
    <g>
      {borders.current.map(id =>
        <Area
          id={territories[borders.byId[id].c]} d={borders.byId[id].d}
          color={territories[borders.byId[id].c].color}
          label={territories[borders.byId[id].c].name} opacity='0.6'
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
    },
    territories: state.territories
  };
}

export default connect(mapStateToProps)(Map);
