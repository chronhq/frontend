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
import { PathLayer } from '@deck.gl/layers';
import { toJS } from 'mobx';

import TripsLayer from './trips-layer';

function expeditionsLayer(traces, visible, animation, time) {
  return (new PathLayer({
    id: 'static-traces-layer',
    data: traces,
    visible: visible && !animation,
    getPath: d => toJS(d.data.path[0].path),
    getColor: () => [65, 140, 171],
    getWidth: () => 5,
    rounded: true,
    widthScale: 3,
    widthMinPixels: 2,
    getDashArray: () => [10, 10],
    // onClick: d => console.log(d.data.id),
  }),
  new TripsLayer({
    id: 'animated-trace-layer',
    data: traces,
    visible: visible && animation,
    getPath: d => toJS(d.timedTraces),
    getColor: () => [65, 140, 171],
    opacity: 1,
    strokeWidth: 10,
    trailLength: 180,
    currentTime: time
  }));
}

export default expeditionsLayer;
