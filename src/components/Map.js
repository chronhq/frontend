import React from 'react';
import Area from './Area';

export default class Map extends React.Component {

  render() {
    var mapAreas = this.props.areas.map(function(area) {
      return <Area d={area.d} label={area.label} color={area.color} id={area.id} />;
    });
    return <svg style={{float: 'left'}} width="80%" height="500px" ><g strokeWidth="0.6" >{mapAreas}</g></svg>;
  }
}
