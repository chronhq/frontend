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
import React from 'react';
import './AdminLevels.less';

import RadioButton from '../RadioButton/RadioButton';

const levels = ['Union', 'Country', 'Region', 'District', 'Municipality', 'City'];

const AdminLevels = ({ selected, select }) => (
  <div className='admin-levels'>
    {levels.map((c, i) => (
      <RadioButton selected={(i + 1) === selected} select={() => select(i + 1)} label={c} />
    ))}
  </div>
);

export default AdminLevels;