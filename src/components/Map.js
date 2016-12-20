import React from 'react';
import Area from './Area';

export default class Map extends React.Component {

  render() {
    let mapAreas = this.props.areas.map(function(area) {
      return <Area d={area.d} label={area.label} color={area.color} id={area.id} />;
    });
    let locationPins = this.props.facts.map(function(fact){
      if(fact.completed){
        let locations = fact.location.map(function(location){
          return <circle cx={location.cx} cy={location.cy} r="10" stroke="Black" stroke-width="1" fill="Blue" />;
        });
        return <g>{locations}</g>;
      }
    });
    return <svg className='svgMap' ><g strokeWidth="0.6" >{mapAreas}</g>{locationPins}</svg>;
  }
}
