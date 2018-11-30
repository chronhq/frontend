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
import { IconLayer } from '@deck.gl/layers';
import Textures from './Textures';

function pinsLayer(
  pins, name, zoom, pickable, onHover = () => ''
) {
  const id = `${name}-pins-layer`;
  return new IconLayer({
    id,
    data: pins,
    // visible: this.options.mapDecorations,
    pickable,
    getAngle: 135,
    iconAtlas: Textures.pin.img,
    iconMapping: Textures.pin.map,
    sizeScale: 1.5,
    getSize: () => (zoom * 10),
    getPosition: d => [d.point.x, d.point.y],
    getIcon: d => `pin-${d.pic}`,
    getColor: () => [66, 66, 66],
    updateTriggers: {
      getSize: zoom,
    },
    onHover,
  });
}

export default pinsLayer;
