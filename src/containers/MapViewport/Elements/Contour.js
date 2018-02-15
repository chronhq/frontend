import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class ContourMap extends React.Component {
  @computed get terrain() {
    return Object.values(this.props.store.borders.contour);
  }

  render() {
    return (
      <g className='svgMapTerrain' key='terrain'>
        {this.terrain.map(continent => (
          <path
            key={`terrain_${continent.id}}`}
            d={continent.projected}
          />
        ))
        }
      </g>
    );
  }
}

export default ContourMap;
