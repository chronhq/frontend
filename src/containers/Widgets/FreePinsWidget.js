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
