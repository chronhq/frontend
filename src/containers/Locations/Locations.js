import React from 'react';
import { observer, inject } from 'mobx-react';

import LocationDot from './LocationDot';
import LocationDotLabel from './LocationDotLabel';
import LocationFlag from './LocationFlag';

const DrawLocationDot = observer(({
  city, visibility, visible, scale, cb
}) => (
  <g
    onClick={cb}
  >
    {visibility.locations
      && <LocationDot location={city} scale={scale} />
    }
    {(visibility.tooltips && visible)
      && <LocationDotLabel location={city} scale={scale} />
    }
  </g>
));

@inject('store')
@observer
class Locations extends React.Component {
  render() {
    return (
      <g id='locations'>
        {this.props.store.prepared.locations.map((city, id) => (
          <DrawLocationDot
            scale={this.props.store.view.preciseScale}
            key={`pin_list_${city.id}`}
            city={city}
            cb={() => this.props.store.clickInfo.selectLocation(city.id)}
            visible={this.props.store.prepared.tooltips[id]}
            visibility={this.props.store.flags.flags.visibility}
          />
        ))}
        <LocationFlag />
      </g>
    );
  }
}

export default Locations;
