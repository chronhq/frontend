import React, { Component } from 'react';
import { connect } from 'react-redux';

class GeoPoints extends Component {
  render() {
    return (
      <g className="mapGeoPoints">
        {this.props.geoPoints.map(icon => (
          <use
            xlinkHref={`#mapPic_${icon.pic}`}
            transform={`translate(${icon.projected.x},${icon.projected.y}) scale(0.05)`}
          />
        ))}
      </g>);
  }
}

function mapStateToProps(state) {
  const tick = state.timeline.year.tick;
  const geoPointsByTick = state.courses.geoPoints.tick;
  return tick in geoPointsByTick
    ? { geoPoints: geoPointsByTick[tick] }
    : { geoPoints: [] };
}

export default connect(mapStateToProps)(GeoPoints);
