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

// translateY(calc(-100% - .5rem))
const getTranslate = (placement, offset) => {
  switch (placement) {
    case 'left':
      return `translate(calc(-100% - ${offset}), -50%)`;
    case 'right':
      return `translate(${offset}, -50%)`;
    case 'bottom':
      return `translate(-50%, ${offset})`;
    case 'top':
    default:
      return `translate(-50%, calc(-100% - ${offset}))`;
  }
};

@inject('store')
@observer
class Tooltip extends React.Component {
  constructor(props) {
    super();
    this.transform = getTranslate(props.placement, props.offset);
  }

  setHover = (h) => {
    const position = this.position(this.ref.getBoundingClientRect());
    const style = { ...position, transform: this.transform };
    this.props.store.tooltip.onMouseEvent(h, style, this.props.content);
  }

  position = (box) => {
    if (!box) return {};
    const { placement } = this.props;
    if (placement === 'left' || placement === 'right') {
      return {
        left: placement === 'left' ? box.left : box.left + box.width,
        top: box.top + (box.height / 2),
      };
    }
    return {
      left: box.left + (box.width / 2),
      top: placement === 'top' ? box.top : box.top + box.height,
    };
  }

  render() {
    return (
      <div
        ref={(r) => { this.ref = r; }}
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
      >
        {this.props.children}
      </div>
    );
  }
}

Tooltip.defaultProps = {
  placement: 'top',
  content: '',
  offset: '.25rem'
};

export default Tooltip;
