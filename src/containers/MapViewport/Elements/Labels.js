import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class MapLabels extends React.Component {
  @computed get labels() {
    return Object.values(this.props.store.prepared.labels);
  }
  render() {
    return (
      <g className="mapLabels">
        {this.labels.map(text => (
          <text
            key={`mapLabel_key_${text.data.id}`}
            className={`mapLabels ${text.data.style}`}
            transform={`translate(${text.projected[0]},${text.projected[1]})`}
          >
            {text.data.string}
          </text>))
        }
      </g>
    );
  }
}

export default MapLabels;
