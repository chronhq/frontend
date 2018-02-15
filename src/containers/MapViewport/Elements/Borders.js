import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { getFillPatternId } from '../../../components/SVGPatternsDefs';
// import { setClickInfo, changeScale } from '../../reducers/actions';

//     b: {
//       visible: state.runtime.visibility.borders,
//       loaded: state.data.borders.loaded,
//       borders: state.runtime.bordersData.borders,
//       properties: state.runtime.bordersData.properties
//     }

@inject('store')
@observer
class BordersMap extends React.Component {
  @computed get borders() {
    return this.props.store.borders.bordersPath;
  }
  render() {
    return (
      <g className='svgMapBorders'>
        {this.borders.map(border => (
          <path
            key={`borders_na_${border.id}`}
            d={border.d}
            fill={`url(#${getFillPatternId(border.props)})`}
            // onClick={() => setClickInfoCb('border', border.props)}
          />
        ))}
      </g>
    );
  }
}

export default BordersMap;

