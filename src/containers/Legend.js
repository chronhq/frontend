import React from 'react';
import { inject, observer } from 'mobx-react';

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
const detailedName = properties => (properties.type.ru === null
  ? `${properties.admin.ru}`
  : `[${properties.type.ru}] ${properties.admin.ru}`);


const fullName = (scaleView, properties) => (
  scaleView === true
    ? properties.admin.ru
    : detailedName(properties));

const Description = ({ properties, scaleView }) => (
  <span>
    {properties.disputed === ''
      ? fullName(scaleView, properties)
      : `${properties.nameru}`
    }
  </span>
);

const LegendItem = ({ colors, propId }) => {
  const vls = colors.uniqLegendItems[propId].colors;
  const boxId = getFillPatternId(colors.uniqLegendItems[propId].id, 'legend');

  return (
    <li>
      <ColorBox c={vls} p={boxId} />
      <Description properties={colors.uniqLegendItems[propId]} scaleView={colors.enabled} />
    </li>
  );
};

@inject('store')
@observer
class Legend extends React.Component {
  render() {
    return (
      <div>
        <h3> Легенда </h3>
        <ul className='Legend'>
          {Object.keys(this.props.store.colors.uniqLegendItems).sort().map(propId => (
            <LegendItem
              key={propId}
              propId={propId}
              colors={this.props.store.colors}
            />
          ))
          }
        </ul>
      </div>
    );
  }
}

export default Legend;
