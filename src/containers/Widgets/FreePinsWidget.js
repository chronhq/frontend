import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
export default class FreePinsWidget extends React.Component {
  rowCapasity = 8;

  xShift = 20;

  yShift = 30;

  @computed get pins() {
    return this.props.store.pins.freePins;
  }

  translateX = idx => (idx % this.rowCapasity) * this.xShift;

  translateY = idx => Math.floor(idx / this.rowCapasity) * this.yShift;

  translate = idx => [this.translateX(idx), -this.translateY(idx)].join(',');

  render() {
    return (
      <g className="freePinsBar" transform='translate(0, -60)'>
        {this.pins.map((icon, idx) => (
          <use
            style={{ pointerEvents: 'all' }}
            key={icon.key}
            width='20px'
            height='20px'
            xlinkHref={`#mapPic_${icon.pic}`}
            transform={`translate(${this.translate(idx)}) rotate(-135)`}
            onMouseEnter={() => {
              this.props.store.pins.setActive(icon.key, true);
              return false;
            }}
            onMouseLeave={() => {
              this.props.store.pins.setActive(null);
              return false;
            }}
            onMouseMove={(e) => {
              e.preventDefault();
              const { pageX, pageY } = e;
              this.props.store.pins.setPosition(pageX, pageY);
            }}
          />
        ))}
      </g>);
  }
}
