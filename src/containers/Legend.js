import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SVGPattern, getFillPatternId } from '../components/SVGPatternsDefs';

import './Legend.less';

const ColorBox = ({ c, p }) => (
  <svg width='1.5em' height='1.2em'>
    <defs>
      <SVGPattern c={c} id={p} />
    </defs>
    <rect
      x='1'
      y='1'
      width='1.5em'
      height='1.2em'
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
  const vls = properties.colors[colorsData.name];
  const boxId = getFillPatternId(properties.id, 'legend');

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
      const scaleView = this.props.colorsData.enabled;
      return this.props.properties.reduce((prev, cur) => {
        const colors = cur.colors[this.props.colorsData.name];
        const mapcolor13 = `${colors}.join('_')}`;
        const name = scaleView === true
          ? `${mapcolor13}_${cur.sr_adm0_a3}`
          : `${mapcolor13}_${cur.disputed}_${cur.type.en}_${cur.sr_adm0_a3}`;
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
              colorsData={this.props.colorsData}
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
    colorsData: state.runtime.colorsData,
    bordersLoaded: state.data.borders.loaded,
    borders: state.runtime.bordersData.borders,
    properties: state.runtime.bordersData.properties,
    visibility: state.runtime.visibility
  };
}

export default connect(mapStateToProps)(Legend);
