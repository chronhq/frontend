/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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

  setBalloon = (icon, e, force = false) => {
    const { pageX, pageY } = e;
    this.props.store.balloon.setPinBalloon(icon.key, true, force);
    this.props.store.balloon.setPosition(pageX, pageY);
    return true;
  }

  render() {
    return (
      <g className="freePinsBar" transform='translate(0, -15)'>
        {this.pins.map((icon, idx) => (
          <use
            style={{ pointerEvents: 'all' }}
            key={icon.key}
            width='20px'
            height='20px'
            xlinkHref={`#mapPic_${icon.pic}`}
            transform={`translate(${this.translate(idx)}) rotate(-135)`}
            onMouseEnter={e => this.setBalloon(icon, e)}
            onClick={e => this.setBalloon(icon, e, true)}
            onMouseLeave={() => this.props.store.balloon.pinned === false
              && this.props.store.balloon.setPinBalloon(null)}
            onMouseMove={e => this.setBalloon(icon, e)}
          />
        ))}
      </g>
    );
  }
}

export default FreePinsWidget;
