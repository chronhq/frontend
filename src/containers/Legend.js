import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Legend.less';

const ColorBox = ({ color }) => (
  <svg width='1.5em' height='1.2em'>
    <rect x='1' y='1' width='1.5em' height='1.2em' fill={color} />
  </svg>
);
const Description = ({ properties }) => (
  <span>
    {`[${properties.type_ru}] ${properties.admin}`}
  </span>
);

const LegendItem = ({ properties, colorFn }) => (
  <li>
    <ColorBox color={colorFn(properties.mapcolor13)} />
    <Description properties={properties} />
  </li>
);

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
      <ul>
        {Object.keys(uniqLegendItems).map(propId => (
          <LegendItem
            key={propId}
            properties={uniqLegendItems[propId]}
            colorFn={c => this.props.color(c)}
          />
        ))
        }
      </ul>
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
