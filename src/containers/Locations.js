import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pin from '../components/Pin';
import PinTooltip from '../components/PinTooltip';


class Locations extends Component {
  getLocation(id) {
    console.log(`Asking for location ID: ${id}`);
    return {
      id,
      x: this.props.projected[id].x,
      y: this.props.projected[id].y,
      name: this.props.places[id].name
    };
  }
  render() {
    return (
      <g key='locations'>
        {this.props.current.map(city =>
          <g key={`pin_list_${city}`}>
            <Pin location={this.getLocation(city)} />
            <PinTooltip location={this.getLocation(city)} />
          </g>
        )}
      </g>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.timeline.locations.current,
    projected: state.locations.projected,
    places: state.locations.places
  };
}

Locations.defaultProps = {
  current: []
};

export default connect(mapStateToProps)(Locations);
