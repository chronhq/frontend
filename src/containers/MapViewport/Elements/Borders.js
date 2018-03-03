import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { getFillPatternId } from '../../../components/SVGPatternsDefs';

@inject('store')
@observer
class BordersMap extends React.Component {
  @computed get borders() {
    return this.visible
      ? this.props.store.borders.bordersPath
      : [];
  }

  @computed get visible() {
    return this.props.store.flags.flags.visibility.borders;
  }

  render() {
    return (
      <g className='svgMapBorders'>
        {this.borders.map(border => (
          <path
            key={`borders_na_${border.id}`}
            d={border.geo.projected}
            fill={`url(#${getFillPatternId(border.props)})`}
            onClick={() => this.props.store.clickInfo.selectBorder(border.props)}
          />
        ))}
      </g>
    );
  }
}

export default BordersMap;

