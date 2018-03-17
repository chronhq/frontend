import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
export default class FreePinsWidget extends React.Component {
  @computed get pins() {
    return this.props.store.pins.freePins;
  }
  rowCapasity = 8;
  xShift = 20;
  yShift = 30;

  translateX = idx => (idx % this.rowCapasity) * this.xShift;
  translateY = idx => Math.floor(idx / this.rowCapasity) * this.yShift;
  translate = idx => [this.translateX(idx), this.translateY(idx)].join(',');

  render() {
    return (
      <g className="freePinsBar" transform='translate(0, -90)'>
        {this.pins.map((icon, idx) => (
          <use
            key={icon.key}
            xlinkHref={`#mapPic_${icon.pic}`}
            transform={`translate(${this.translate(idx)}) scale(0.04) rotate(-135)`}
            onMouseEnter={() => {
              this.props.store.pins.setActive(icon.key, true);
              return false;
            }}
            onMouseLeave={() => {
              this.props.store.pins.setActive(null);
              return false;
            }}
          />
        ))}
      </g>);
  }
}
