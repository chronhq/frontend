import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SVGPattern, getFillColors, getFillPatternId } from '../components/SVGPatternsDefs';
import { getBordersFromState } from '../reducers/actions';

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
    ? `[${properties.type.ru}] ${properties.admin.ru}`
    : `${properties.nameru}`
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
      return this.props.properties.reduce((prev, cur) => {
        // const name = `legend_${cur.id}`;
        const name = `${cur.mapcolor13}_${cur.disputed}_${cur.type.en}_${cur.sr_adm0_a3}`;
        return { ...prev, [name]: cur };
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
            />
          ))
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const bordersData = getBordersFromState(state);
  return {
    bordersLoaded: state.borders.loaded,
    borders: bordersData.borders,
    properties: bordersData.properties,
    visibility: state.visibility
  };
}

export default connect(mapStateToProps)(Legend);
