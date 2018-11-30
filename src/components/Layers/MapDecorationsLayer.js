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

function decorationsLayer(decorations, visible, deck) {
  return new IconLayer({
    id: 'map-decoration-layer',
    data: decorations,
    visible,
    pickable: true,
    iconAtlas: Textures.decoration.img,
    iconMapping: Textures.decoration.map,
    getAngle: d => d.transform.rotate,
    sizeScale: 3,
    getSize: d => (deck.zoom * d.transform.scale),
    getPosition: d => [d.geopoint[0], d.geopoint[1]],
    getIcon: d => `decoration-${d.picId}`,
    getColor: () => [66, 66, 66],
    updateTriggers: {
      getSize: deck.zoom,
    },
    onClick: d => console.log('decor:', d)
  });
}

export default decorationsLayer;
