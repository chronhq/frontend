import React from 'react';
import Area from './Area';
import Pin from './Pin';

export default class Map extends React.Component {

  render() {
    let mapAreas = this.props.areas.map(function(area) {
      return <Area d={area.d} label={area.label} color={area.color} id={area.id} />;
    });
    let locationPins = this.props.facts.map(function(fact){
      if(fact.completed){
        let locations = fact.location.map(function(location){
          return <Pin location={location} />
        });
        return <g>{locations}</g>;
      }
    });
    return <svg className='svgMap' ><g strokeWidth="0.6" >{mapAreas}</g>{locationPins}</svg>;
  }
}
