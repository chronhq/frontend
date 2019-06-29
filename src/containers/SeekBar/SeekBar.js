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
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import React from 'react';

import { select, mouse } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

import Axis from '../../components/TimePanelAxis/Axis';
import Cursor from '../../components/TimePanelAxis/AxisCircle';

import './SeekBar.less';

@inject('store')
@observer
class SeekBar extends React.Component {
  @observable isDown = false;

  componentDidMount() {
    const svg = select(this.svgTime);
    svg.on('mouseup', () => {
      this.isDown = false;
      this.unfollowMouse();
      const rectId = this.svgTime.childNodes[0];
      const mouseX = mouse(rectId)[0];
      if (mouseX > 0 && mouseX < this.width) {
        this.year.setYear(Math.round(this.scale.invert(mouseX)));
        this.props.store.analytics.metricHit('check_timepanel');
      }
    });
    svg.on('mousedown', () => {
      this.isDown = true;
      this.followMouse();
    });
  }

  @computed get width() {
    return this.props.store.deck.width < 600
      ? this.props.store.deck.width
      : this.props.store.deck.width - 300;
  }

  @computed get year() {
    return this.props.store.year;
  }

  @computed get scale() {
    return scaleLinear()
      .domain([this.year.limits.min, this.year.limits.max])
      .range([0, this.width]);
  }

  @computed get translate() {
    return this.scale(this.year.tuneValueG) || 0;
  }

  @computed get ticks() {
    const ticks = parseInt(this.width / 45, 10);
    const maxTicks = this.year.limits.max - this.year.limits.min;
    return (Number.isNaN(maxTicks) || ticks <= maxTicks) ? ticks : maxTicks;
  }


  followMouse() {
    select(this.svgTime)
      .on('mousemove', () => {
        const rectId = this.svgTime.childNodes[0];
        const mouseX = mouse(rectId)[0];
        if (mouseX >= 0 && mouseX <= this.width) {
          const now = Math.round(this.scale.invert(mouseX));
          this.year.setTuneValue(now);
        }
      });
  }

  unfollowMouse() {
    select(this.svgTime)
      .on('mousemove', null);
  }

  render() {
    const viewBox = `-15 -15 ${this.width + 30} 50`;
    return (
      <div className='timepanel__slider'>
        <svg
          className="svgTime"
          ref={(r) => { this.svgTime = r; }}
          width={this.width}
          viewBox={viewBox}
          preserveAspectRatio="xMaxYMin meet"
        >
          <Axis width={this.width} scale={this.scale} ticks={this.ticks} />
          <Cursor translate={this.translate} active={this.isDown} />
          {/*
            <rect
              x='0'
              y='-15'
              width={this.width}
              height='50'
              opacity='0'
              style={{ zIndex: -1 }}
            />
          */}
        </svg>
      </div>
    );
  }
}

export default SeekBar;
