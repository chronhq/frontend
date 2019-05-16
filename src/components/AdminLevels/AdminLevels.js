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

const levels = ['Union', 'Country', 'Region', 'District', 'Municipality', 'City'];

const Level = ({ selected, select, label }) => (
  <div
    className={`admin-level ${selected ? 'admin-level-selected' : ''}`}
    onClick={() => select()}
    onKeyPress={() => select()}
    tabIndex={0}
    role='button'
  >
    <div className='admin-level__radio-container'>
      <div className={`admin-level__radio-marker admin-level__radio-marker--hover ${selected ? 'admin-level__radio-marker--selected' : ''}`} />
    </div>
    <div className='admin-level__label admin-level__label--hover'>
      {label}
    </div>
  </div>
);

const AdminLevels = ({ selected, select }) => (
  <div className='admin-levels'>
    {levels.map((c, i) => (
      <Level selected={(i + 1) === selected} select={() => select(i + 1)} label={c} />
    ))}
  </div>
);

export default AdminLevels;
