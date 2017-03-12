import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SVGPattern, getFillColors, getFillPatternId } from '../components/SVGPatternsDefs';

import './Legend.less';

const ColorBox = ({ c, p }) => (
  <svg width='1.5em' height='1.2em'>
    <defs>
      <SVGPattern c={c} id={p} />
    </defs>
    <rect
      x='1' y='1' width='1.5em' height='1.2em'
      fill={`url(#${p})`}
    />
  </svg>
);
const Description = ({ properties }) => (
  <span>{properties.disputed === ''
    ? `[${properties.type_ru}] ${properties.admin}`
    : `${properties.nameRu}`
  }
  </span>
);

const LegendItem = ({ properties }) => {
  const [ids, vls] = getFillColors(properties);
  const boxId = getFillPatternId(ids, 'legend');

  return (
    <li>
      <ColorBox c={vls} p={boxId} />
      <Description properties={properties} />
    </li>
  );
};

class Legend extends Component {
  uniqLegendItems = () => {
    if (this.props.visibility.borders
          && this.props.bordersLoaded === true
          && Array.isArray(this.props.borders)) {
      return this.props.bordersData.features.reduce((prev, cur) => {
        const name = `${cur.properties.mapcolor13}_${cur.properties.type_en}_${cur.properties.sr_adm0_a3}`;
        return { ...prev, [name]: cur.properties };
      }, {});
    }
    return {};
  }

  render() {
    const uniqLegendItems = this.uniqLegendItems();
    return (
      <div>
      <h3> Легенда </h3>
        <ul className='Legend'>
          {Object.keys(uniqLegendItems).map(propId => (
            <LegendItem
              key={propId}
              properties={uniqLegendItems[propId]}
              colorFn={c => this.props.color(c)}
            />
          ))
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bordersLoaded: state.borders.loaded,
    borders: state.timeline.borders.current !== ''
      ? state.borders.projected[state.timeline.borders.current]
      : [],
    bordersData: state.timeline.borders.current !== ''
      ? state.borders.byYear[state.timeline.borders.current]
      : [],
    color: state.projection.color,
    visibility: state.visibility
  };
}

export default connect(mapStateToProps)(Legend);
