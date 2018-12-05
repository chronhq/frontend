import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import LayerToggle from '../../components/LayerToggle/LayerToggle';

// dumbData object contains desciption of used layers and pins for eohd2018-mvp-chron project.
// #HARDCODE
const dumpData = {
  layer: [
    'borders', 'cities'],
  pins: [
    'inventions', 'persons', 'geoEvents'],
};

@inject('store')
@observer
class LayerControlWrapper extends React.Component {
  @action handleLayer(data) {
    Object.keys(data.payload).map((cur) => {
      this.props.store.flags[data.place].set(cur, data.payload[cur]);
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
              label={id}
              place={place}
              checked={this.props.store.flags[place].list[id]}
              name={id}
              cb={o => this.handleLayer(o)}
            />
          ))
        ))}
      </React.Fragment>
    );
  }
}

export default LayerControlWrapper;
