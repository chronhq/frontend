import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pin from '../components/Pin';
import PinTooltip from '../components/PinTooltip';


class Locations extends Component {
  getLocation(id) {
    return {
      id,
      x: this.props.projected[id].x,
      y: this.props.projected[id].y,
      name: this.props.places[id].name,
      scaleRank: (this.props.places[id].scaleRank * this.props.scale) / 100 / 3
    }; // Default scale is 300 for point size
  }
  checkSize(id) {
    return this.props.places[id].scaleRank < this.props.visibility.scale;
  }
  render() {
    return (
      <g key='locations'>
        {this.props.current.map(city => (
          this.checkSize(city) ?
            <g key={`pin_list_${city}`}>
              {this.props.visibility.locations &&
                <Pin location={this.getLocation(city)} />
              }
              {this.props.visibility.tooltips &&
                <PinTooltip location={this.getLocation(city)} />
              }
            </g>
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
