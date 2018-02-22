import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class MapDecorations extends React.Component {
  @computed get decorations() {
    return Object.values(this.props.store.prepared.decorations);
  }

  render() {
    return (
      <g className="mapDecorations">
        {this.decorations.map(icon => (<use
          key={`mapPic_key_${icon.data.id}_${icon.data.picId}`}
          xlinkHref={`#mapPic_${icon.data.picId}`}
          transform={`translate(${icon.projected[0]},${icon.projected[1]}) ${icon.data.transform}`}
        />))
        }
      </g>
    );
  }
}

export default MapDecorations;
