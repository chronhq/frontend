/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { observable, action } from 'mobx';
import CloseButton from '../../components/Button/CloseButton';


@inject('store')
@observer
class BalloonControls extends React.Component {
  @observable mouseX = 0;

  @observable mouseY = 0;

  @action setMousePosition(e) {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  }

  mouseDragDown = (e) => {
    this.setMousePosition(e);
    this.props.store.balloon.dragClick(true);
  }

  mouseDrag = (e) => {
    e.preventDefault();
    if (this.props.store.balloon.dragOn) {
      this.props.store.balloon.setPosition(
        this.props.store.balloon.pageX - (this.mouseX - e.pageX),
        this.props.store.balloon.pageY - (this.mouseY - e.pageY)
      );
      this.setMousePosition(e);
    }
  }

  render() {
    if (!this.props.store.balloon.pinned) return '';
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className='balloon-controls'>
        <div
          className='balloon-drag'
          onMouseDown={this.mouseDragDown}
          onMouseUp={() => this.props.store.balloon.dragClick(false)}
          onMouseLeave={() => this.props.store.balloon.dragClick(false)}
          onMouseMove={this.mouseDrag}
        >
          <hr />
        </div>
        <CloseButton onClick={() => this.props.store.balloon.unpin()} compact />
      </div>
    );
  }
}

export default BalloonControls;
