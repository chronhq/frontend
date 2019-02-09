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

const buildNarrative = ({
  url = 'fake', id = -1,
  title = '', author = '', description = '',
  min = 1783, max = 2000, tags = [],
  center = [0, 0], minScale = 1, maxScale = 7.5
}) => ({
  url,
  id,
  title,
  author,
  description,
  tags,
  config: {
    year: {
      min,
      max,
      now: min,
      tick: 0,
    },
    projection: {
      clip: [[-180, 90], [180, -90]],
      rotate: [0, 0, 0],
      center
    },
    settings: {
      flags: {
        zoom: {
          minScale,
          maxScale
        }
      }
    }
  }
});

export default buildNarrative;
