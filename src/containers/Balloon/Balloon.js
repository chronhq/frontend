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
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import './Balloon.less';
import BalloonControls from './BalloonControls';
import BalloonContent from './BalloonContent';

@inject('store')
@observer
class Balloon extends React.Component {
  @computed get balloon() {
    return this.props.store.balloon;
  }

  @computed get data() {
    return this.balloon.selected;
  }

  @computed get opacity() {
    if (this.balloon.countryHover === false) {
      return (this.data === null || this.data === undefined || this.data.info.length === 0)
        ? 0 : 1;
    }
    return 1;
  }

  @computed get style() {
    return {
      opacity: this.opacity,
      visibility: this.opacity ? 'visible' : 'hidden',
      top: `${this.balloon.pageY}px`,
      left: `${this.balloon.pageX}px`,
    };
  }

  @computed get positionClassName() {
    let { pageX, pageY } = this.balloon;
    if (this.balloon.pinned) {
      pageX = this.balloon.pageXP;
      pageY = this.balloon.pageYP;
    }

    const { width, height } = this.props.store.deck;
    if (pageX > 0.5 * width) {
      return (pageY < 0.7 * height)
        ? 'balloonTopRight'
        : 'balloonBottomRight';
    }
    return (pageY < 0.7 * height)
      ? 'balloonTopLeft'
      : 'balloonBottomLeft';
  }

  render() {
    const container = `balloonContainer ${this.positionClassName}`;
    return (
      <div style={{ ...this.style }} className={container}>
        <BalloonControls cachePosition={() => this.cachePosition()} />
        <BalloonContent />
      </div>
    );
  }
}

export default Balloon;
