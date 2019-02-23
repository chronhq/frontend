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
// TODO: use this pics for MVT sprites
// import citiesAtlas from './geoAssets/cities.svg';
// import citiesMapping from './geoAssets/cities.json';

// import decorationAtlas from './geoAssets/decoration.svg';
// import decorationMapping from './geoAssets/decoration.json';

import oceanAtlas from './geoAssets/ocean.svg';
import oceanMapping from './geoAssets/ocean.json';

import pinAtlas from './geoAssets/pin.svg';
import pinMapping from './geoAssets/pin.json';

export default {
  // cities: {
  //   map: citiesMapping,
  //   img: citiesAtlas
  // },
  // decoration: {
  //   map: decorationMapping,
  //   img: decorationAtlas
  // },
  ocean: {
    map: oceanMapping,
    img: oceanAtlas
  },
  pin: {
    map: pinMapping,
    img: pinAtlas
  },
};
