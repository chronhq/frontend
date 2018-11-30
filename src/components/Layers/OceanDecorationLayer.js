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

function oceanDecorationLayer(oceans, visible, deck) {
  return new IconLayer({
    id: 'map-oceans-layer',
    data: oceans,
    visible,
    pickable: true,
    iconAtlas: Textures.ocean.img,
    iconMapping: Textures.ocean.map,
    getAngle: 0,
    sizeScale: 3,
    getSize: d => (deck.zoom * d.size),
    getPosition: d => [d.geopoint[0], d.geopoint[1]],
    getIcon: d => `ocean-${d.picId}`,
    updateTriggers: {
      getSize: deck.zoom,
    },
    onClick: d => console.log('ocean:', d)
  });
}

export default oceanDecorationLayer;
