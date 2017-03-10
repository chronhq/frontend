import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pin from '../components/Pin';
import PinTooltip from '../components/PinTooltip';

const DrawPin = ({ city, visibility, scale }) => (
  <g key={`pin_list_${city.id}`}>
    {visibility.locations &&
      <Pin location={city} scale={scale} />
    }
    {visibility.tooltips && scale > city.scaleRank &&
      <PinTooltip location={city} scale={scale} />
    }
  </g>
);

class Locations extends Component {
  getLocation = id => ({
    id,
    x: this.props.projected[id].x,
    y: this.props.projected[id].y,
    name: this.props.places[id].name,
    scaleRank: this.props.places[id].scaleRank
  }); // Default scale is 300 for point size

  checkSize = id => this.props.places[id].scaleRank < this.props.visibility.scale;

  render() {
    return (
      <g key='locations'>
        {this.props.current.map(city => (
          this.checkSize(city)
            ? <DrawPin
              scale={this.props.scale}
              key={`pin_list_${city}`}
              city={this.getLocation(city)}
              visibility={this.props.visibility}
            />
          : ''
        ))}
      </g>
    );
  }
}

function mapStateToProps(state) {
  return {
    visibility: state.visibility,
    scale: state.projection.scale,
    current: state.timeline.locations.current,
    projected: state.locations.projected,
    places: state.locations.places
  };
}

Locations.defaultProps = {
  current: []
};

export default connect(mapStateToProps)(Locations);
