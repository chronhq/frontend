import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pin from './Pin';
import PinTooltip from './PinTooltip';
import LocationFlag from './LocationFlag';

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
    selected: -1,
    selectedLoc: {
      id: 0,
      x: 0,
      y: 0,
      scaleRank: 0,
      name: 0
    },
    locationFlag: false,
    selectedType: 'locations'
  }

  componentWillReceiveProps(nextProps) {
    const getSelectedLoc = () => nextProps.selectedType !== 'geoEvents'
          ? this.props.projected[nextProps.selected]
          : this.props.geoEvents[nextProps.selected];

    if (nextProps.selected !== this.state.selected
    || nextProps.selectedType != this.state.selectedType) {
      if (nextProps.selected === null || !(nextProps.selected in nextProps.places)) {
        this.setState({ // Hide locationFlag
          locationFlag: false
        });
      } else {
        const selectedLoc = getSelectedLoc();
        this.setState({
          locationFlag: true,
          selected: nextProps.selected,
          selectedLoc,
          selectedType: nextProps.selectedType,
        });
      }
    }
    if (nextProps.selectedType === this.state.selectedType
    && nextProps.selected === this.state.selected
    && this.state.locationFlag === false) {
      // In case of new projection need to set projected data again
      const selectedLoc = getSelectedLoc();
      this.setState({ locationFlag: true, selectedLoc });
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
          location={this.state.selectedLoc}
          scale={this.props.scale}
        />
      </g>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.status.selectedLocation,
    selectedType: state.status.selectedLocationType,
    visibility: state.visibility,
    scale: state.mapView.scale,
    current: state.timeline.locations.current,
    projected: state.locations.projected,
    geoEvents: state.geoEvents.projected,
    places: state.locations.places
  };
}

Locations.defaultProps = {
  current: []
};

export default connect(mapStateToProps)(Locations);
