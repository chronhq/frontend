import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class FeedPins extends React.Component {
  @computed get pins() {
    return this.props.store.pins.pins;
  }
  render() {
    return (
      <g className="mapFeedPins">
        {this.pins.map(icon => (
          <use
            key={icon.key}
            xlinkHref={`#mapPic_${icon.pic}`}
            transform={`translate(${icon.point.x},${icon.point.y}) scale(0.01) rotate(-135)`}
            onMouseEnter={() => console.log('Hovering over pin', icon.key)}
          />
        ))}
      </g>);
  }
}
export default FeedPins;
