import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pin from '../components/Pin';
import PinTooltip from '../components/PinTooltip';
import LocationFlag from '../components/LocationFlag';

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
  state = {
    selected: 1,
    locationFlag: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      if (nextProps.selected === null) {
        this.setState({ // Initial state
          selected: Object.keys(nextProps.places).shift(),
          locationFlag: false
        });
      } else {
        this.setState({ locationFlag: true, selected: nextProps.selected });
      }
    }
    if (nextProps.selected === this.state.selected && this.state.enablePin === false) {
      this.setState({ locationFlag: true });
    }

  }

  getLocation = id => ({
    id,
    x: this.props.projected[id].x,
    y: this.props.projected[id].y,
    name: this.props.places[id].name_rus,
    scaleRank: this.props.places[id].scalerank
  });

  checkSize = id => this.props.places[id].scalerank < this.props.visibility.scale;
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
        <LocationFlag
          enabled={this.state.locationFlag}
          location={this.getLocation(this.state.selected)}
          scale={this.props.scale}
        />
      </g>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.status.selectedLocation,
    visibility: state.visibility,
    scale: state.mapView.scale,
    current: state.timeline.locations.current,
    projected: state.locations.projected,
    places: state.locations.places
  };
}

Locations.defaultProps = {
  current: []
};

export default connect(mapStateToProps)(Locations);
