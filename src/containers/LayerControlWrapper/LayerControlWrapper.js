import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import LayerToggle from '../../components/LayerToggle/LayerToggle';

// dumbData object contains desciption of used layers and pins for eohd2018-mvp-chron project.
// #HARDCODE #TODO
const dumpData = {
  layer: ['borders', 'cities'],
  pins: ['persons', 'battle', 'document'],
};

@inject('store')
@observer
class LayerControlWrapper extends React.Component {
  @computed get msg() {
    return this.props.store.i18n.data;
  }

  nameToTooltip = id => this.msg.layerNames[id];

  handleLayer = (data) => {
    Object.keys(data.payload).map((cur) => {
      this.props.store.flags[data.place].set(cur, data.payload[cur]);
      this.props.store.analytics.metricHit(`main_${cur}`);
      return false;
    });
  }

  render() {
    return (
      <React.Fragment>
        {Object.keys(dumpData).map(place => (
          dumpData[place].map(id => (
            <LayerToggle
              id={id}
              key={`layer_${id}`}
              tooltip={this.nameToTooltip(id)}
              label={id}
              place={place}
              checked={this.props.store.flags[place].list[id]}
              name={id}
              cb={this.handleLayer}
            />
          ))
        ))}
      </React.Fragment>
    );
  }
}

export default LayerControlWrapper;
