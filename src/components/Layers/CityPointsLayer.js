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

function cityPointsLayer(cities, visible, deck) {
  const { showCluster, sizeScale, rZoom: z } = deck;
  return new IconLayer({
    id: 'city-points-layer',
    data: cities,
    visible,
    pickable: true,
    iconAtlas: Textures.cities.img,
    iconMapping: Textures.cities.map,
    // sizeScale: ICON_SIZE * size * window.devicePixelRatio,
    sizeScale,
    getPosition: d => [d.x, d.y],
    getIcon: (d) => {
      if (d.zoomLevels[z] !== null) {
        return d.zoomLevels[z].icon;
      }
      return null;
    },
    getSize: d => (showCluster ? d.zoomLevels[z] && d.zoomLevels[z].size : 1),
    updateTriggers: {
      getIcon: z,
      getSize: z
    },
    onClick: d => console.log('info:', d)
  });
}

export default cityPointsLayer;
