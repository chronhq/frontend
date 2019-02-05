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
/** @file Draw svg fill pattern boxes for Legend and Map
 */
import React from 'react';
import mapPics from './mapPics';

/* eslint-disable react/no-array-index-key */
// It's a static data it would not be changed
const MapPicsDefs = ({ symbols }) => ( // SymbolsDefs
  <g className="symbolsDefs">
    {Object.values(symbols).map(mapPic => (
      <symbol
        id={`mapPic_${mapPic.id}`}
        key={`mapPic_key_${mapPic.id}`}
        viewBox={mapPic.viewbox}
      >
        {mapPic.g.map((g, idx) => (
          <path
            key={`mapPic_g_key_${mapPic.id}_${idx}`}
            d={g.d}
            style={{ ...g.style }}
          />))}
      </symbol>
    ))}
  </g>
);


class Defs extends React.Component {
  render() {
    return (
      <defs>
        <MapPicsDefs symbols={mapPics} />
      </defs>
    );
  }
}

export default Defs;
