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
/* eslint-disable camelcase */
const buildNarrative = ({
  url = 'fake', id = -1,
  title = '', author = '', description = '', mapSettings = undefined,
  start_year = 1783, end_year = 2000, tags = [],
}) => ({
  url,
  id,
  title,
  author,
  description,
  mapSettings,
  tags,
  start_year,
  end_year
});

const buildMapSettings = ({
  id = -1,
  zoom_min = 1, zoom_max = 7.5,
  // [[left, bottom], [right, top]]
  coordinates = [[0, 0], [0, 0]]
}) => ({
  id,
  bbox: {
    type: 'MultiPoint',
    coordinates
  },
  zoom_min,
  zoom_max
});

export {
  buildNarrative,
  buildMapSettings
};
