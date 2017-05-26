import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pin from './Pin';
import PinTooltip, { getTooltipSize } from './PinTooltip';
import LocationFlag from './LocationFlag';
import { setClickInfo } from '../../reducers/status';

const DrawPin = ({ city, visibility, visible, scale, cb }) => (
  <g key={`pin_list_${city.id}`}
    onClick={cb} >
    {visibility.locations &&
      <Pin location={city} scale={scale} />
    }
    {(visibility.tooltips && visible) &&
      <PinTooltip location={city} scale={scale} />
    }
  </g>
);

class Locations extends Component {
  constructor(props) {
    super(props);
    const current = this.sortPlacesByScaleRank(props);
    const visibility = this.getVisibility(props, current);
    this.state = {
      selected: -1,
      selectedLoc: {
        id: 0,
        x: 0,
        y: 0,
        scaleRank: 0,
        name: 0
      },
      current, // []
      visibility, // []
      locationFlag: false,
      selectedType: 'locations'
    }
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

    // Prepare current cities list
    if (nextProps.current !== this.props.current) {
      const current = this.sortPlacesByScaleRank(nextProps);
      const visibility = this.getVisibility(nextProps, current);
      this.setState({ current, visibility });
    } else if (nextProps.scale != this.props.scale){
      const visibility = this.getVisibility(nextProps, this.state.current);
      this.setState({ visibility });
    }
  }

  sortPlacesByScaleRank = (nextProps) => {
    // Prepare current cities list
    // sort current cities by scale
    const byScale = nextProps.current.reduce((prev, city) => {
      const scaleRank = Number(nextProps.places[city].scalerank);
      // check size
      if (nextProps.places[city].scalerank < nextProps.visibility.scale) {
        if (!(scaleRank in prev)) prev[scaleRank] = [];
        return {
          ...prev,
          [scaleRank]: [...prev[scaleRank], city]
        }
      } else {
        return { ...prev };
      }
    }, {});
    // Join them into one array
    const current = Object.keys(byScale).reduce(
      (prev, scale) => [...prev, ...byScale[scale]], []);
    return current;
  }

  getVisibility = (props, current) => {
    if (props.visibility.tooltips) {
      const tooltips = []; // array of added text rectangles
      return current.map((city) => {
        const loc = this.getLocation(city);
        const size = getTooltipSize(loc, props.scale);
        const noOverlap = (s) => ( // returns false is collision detected
          (s.top > size.bottom || s.bottom < size.top
          || s.left > size.right || s.right < size.left)
        );
        const placeIsFree = tooltips.every(noOverlap);
        if (placeIsFree === true) {
          tooltips.push(size);
          return true;
        }
        return false;
      });
    } else {
      return current.map(() => false);
    }
  };

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
        {this.state.current.map((city, id) => (
          this.checkSize(city)
            ? <DrawPin
            scale={this.props.scale}
            key={`pin_list_${city}`}
            city={this.getLocation(city)}
            cb={() => this.props.setClickInfo('location', city)}
            visible={this.state.visibility[id]}
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

function mapDispatchToProps(dispatch) {
  return {
    setClickInfo: bindActionCreators(setClickInfo, dispatch)
  };
}

Locations.defaultProps = {
  current: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
