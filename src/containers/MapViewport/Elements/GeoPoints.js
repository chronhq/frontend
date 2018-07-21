import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class GeoPoints extends React.Component {
  @computed get geoPoints() {
    return this.props.store.prepared.geoPoints;
  }

  render() {
    return (
      <g className="mapGeoPoints">
        {this.geoPoints.map(icon => (
          <use
            key={`mapPic_geo_key_${icon.data.id}_${icon.data.pic}`}
            xlinkHref={`#mapPic_${icon.data.pic}`}
            transform={`translate(${icon.projected[0]},${icon.projected[1]}) scale(0.05) rotate(-135)`}
          />
        ))}
      </g>);
  }
}

export default GeoPoints;
