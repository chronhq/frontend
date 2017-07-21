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
const Description = ({ properties, scaleView }) => (
  <span>{properties.disputed === ''
    ? scaleView === true
        && `${properties.admin.ru}`
        || `[${properties.type.ru}] ${properties.admin.ru}`
    : `${properties.nameru}`
  }
  </span>
);

const LegendItem = ({ properties, colorsData }) => {
  const [ids, vls] = getFillColors(properties, colorsData);
  const boxId = getFillPatternId(ids, 'legend');

  return (
    <li>
      <ColorBox c={vls} p={boxId} />
      <Description properties={properties} scaleView={colorsData.enabled} />
    </li>
  );
};

class Legend extends Component {
  uniqLegendItems = () => {
    if (this.props.visibility.borders
          && this.props.bordersLoaded === true
          && Array.isArray(this.props.borders)) {
      const scaleView = this.props.landOwnershipColors.enabled;
      return this.props.properties.reduce((prev, cur) => {
        // const name = `legend_${cur.id}`;
        const mapcolor13 = getFillColors(cur, this.props.landOwnershipColors)[0].shift();
        // const mapcolor13 = ids.shift();
        const name = scaleView === true
          ? `${mapcolor13}_${cur.sr_adm0_a3}`
          : `${mapcolor13}_${cur.disputed}_${cur.type.en}_${cur.sr_adm0_a3}`;
        return { ...prev, [name]: cur };
      }, {});
    }
    return {};
  }

  render() {
    const uniqLegendItems = this.uniqLegendItems(this.props.landOwnershipColors.enabled);
    return (
      <div>
        <h3> Легенда </h3>
        <ul className='Legend'>
          {Object.keys(uniqLegendItems).map(propId => (
            <LegendItem
              key={propId}
              properties={uniqLegendItems[propId]}
              colorsData={this.props.landOwnershipColors}
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
    landOwnershipColors: state.status.landOwnershipColors,
    bordersLoaded: state.borders.loaded,
    borders: bordersData.borders,
    properties: bordersData.properties,
    visibility: state.visibility
  };
}

export default connect(mapStateToProps)(Legend);
