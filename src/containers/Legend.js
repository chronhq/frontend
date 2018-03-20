import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

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

@inject('store')
@observer
class Description extends React.Component {
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  @computed get detailedName() {
    const { properties } = this.props;
    return properties.type[this.lng] === null
      ? `${properties.admin[this.lng]}`
      : `[${properties.type[this.lng]}] ${properties.admin[this.lng]}`;
  }

  @computed get adminName() {
    return this.props.properties.admin[this.lng];
  }

  @computed get fullName() {
    console.log('Full name', this.props.store.colors.status);
    return this.props.store.colors.status
      ? this.adminName
      : this.detailedName;
  }

  @computed get shortName() {
    return this.lng === 'ru'
      ? this.props.properties.nameru
      : this.props.properties.name;
  }

  @computed get name() {
    return this.props.properties.disputed === ''
      ? this.fullName
      : this.shortName;
  }

  render() {
    return (<span>{this.name}</span>);
  }
}

@inject('store')
@observer
// const LegendItem = ({ colors, propId }) => {
class LegendItem extends React.Component {
  @computed get colors() {
    return this.props.store.colors;
  }
  render() {
    const { propId } = this.props;
    const vls = this.colors.uniqLegendItems[propId].colors;
    const boxId = getFillPatternId(this.colors.uniqLegendItems[propId].id, 'legend');

    return (
      <li>
        <ColorBox c={vls} p={boxId} />
        <Description properties={this.colors.uniqLegendItems[propId]} />
      </li>
    );
  }
}

@inject('store')
@observer
class Legend extends React.Component {
  render() {
    return (
      <ul className='Legend'>
        {Object.keys(this.props.store.colors.uniqLegendItems).sort().map(propId => (
          <LegendItem
            key={propId}
            propId={propId}
          />
        ))
        }
      </ul>
    );
  }
}

export default Legend;
