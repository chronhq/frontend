import React from 'react';
import { observer, inject } from 'mobx-react';

import LocationDot from './LocationDot';
import LocationDotLabel from './LocationDotLabel';
// import LocationFlag from './LocationFlag';
// import { setClickInfo } from '../../reducers/actions';

const DrawLocationDot = observer(({
  city, visibility, visible, scale, cb
}) => (
  <g
    onClick={cb}
  >
    {visibility.locations &&
      <LocationDot location={city} scale={scale} />
    }
    {(visibility.tooltips && visible) &&
      <LocationDotLabel location={city} scale={scale} />
    }
  </g>
));

@inject('store')
@observer
class Locations extends React.Component {
  render() {
    return (
      <g key='locations'>
        {this.props.store.locations.locations.map((city, id) => (
          <DrawLocationDot
            scale={this.props.store.view.preciseScale}
            key={`pin_list_${city.id}`}
            city={city}
            // cb={() => this.props.setClickInfo('location', city)}
            visible={this.props.store.locations.tooltips[id]}
            visibility={this.props.store.flags.flags.visibility}
          />
        ))}
        {/*
        <LocationFlag
          enabled={this.state.locationFlag}
          location={this.state.selectedLoc}
          scale={this.props.scale}
        />
        */}
      </g>
    );
  }
}

export default Locations;
