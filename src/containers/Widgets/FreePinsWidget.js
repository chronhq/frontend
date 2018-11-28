import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class FreePinsWidget extends React.Component {
  rowCapacity = 8;

  xShift = 20;

  yShift = 30;

  @computed get pins() {
    return this.props.store.pins.freePins;
  }

  translateX = idx => (idx % this.rowCapacity) * this.xShift;

  translateY = idx => Math.floor(idx / this.rowCapacity) * this.yShift;

  translate = idx => [this.translateX(idx), -this.translateY(idx)].join(',');

  setTooltip = (icon, e) => {
    const { pageX, pageY } = e;
    this.props.store.pins.setActive(icon.key, true);
    this.props.store.pins.setPosition(pageX, pageY);
    return true;
  }

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
            onMouseEnter={e => this.setTooltip(icon, e)}
            onMouseLeave={() => {
              this.props.store.pins.setActive(null);
              return true;
            }}
            onMouseMove={e => this.setTooltip(icon, e)}
          />
        ))}
      </g>);
  }
}

export default FreePinsWidget;
