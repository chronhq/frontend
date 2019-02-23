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

import ScaleWidget from './ScaleWidget';
import LoadingWidget from './LoadingWidget';
import FreePinsWidget from './FreePinsWidget';
import Defs from './Defs';

@inject('store')
@observer
class Widgets extends React.Component {
  render() {
    // TODO store calculations and flags somewhere in models
    const showWidgets = this.props.store.deck.width > 600;
    const shiftHeight = this.props.store.deck.height - 100;
    // TODO link Dashboard witdh (400px) from css to js somehow.
    const shiftX = 50 + (this.props.store.dashboard.hidden ? 0 : 400);
    const translate = `translate(${shiftX}, ${shiftHeight})`;
    return (
      <svg
        width={this.props.store.deck.width}
        height={this.props.store.deck.height}
        style={{ zIndex: 2, pointerEvents: 'none', position: 'absolute' }}
      >
        <Defs />
        {showWidgets && (
          <g id='svgWidgets' transform={translate}>
            <ScaleWidget />
            <LoadingWidget />
            <FreePinsWidget />
          </g>
        )}
      </svg>
    );
  }
}

export default Widgets;
