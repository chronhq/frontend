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
import { computed } from 'mobx';

import './TooltipOverlay.less';

@inject('store')
@observer
class TooltipOverlay extends React.Component {
  @computed get tooltip() {
    return this.props.store.tooltip;
  }

  render() {
    return !this.tooltip.visible ? null : (
      <div className='float-container tooltip-overlay tooltip-overlay__font' style={this.tooltip.style}>
        {this.tooltip.content}
      </div>
    );
  }
}

export default TooltipOverlay;
