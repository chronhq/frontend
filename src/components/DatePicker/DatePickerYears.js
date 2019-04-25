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

/* eslint-disable jsx-a11y/anchor-is-valid */
const YearEntity = ({
  year, label, cb = () => true, selected
}) => {
  const click = (e) => { e.preventDefault(); cb(year); return false; };
  const cn = 'date-picker__years-row-item';
  const className = `${cn} ${selected ? `${cn}-selected` : ''}`;
  return (
    <a href='' onClick={click}>
      <span className={className}>
        {label < 10 ? `0${label}` : label}
      </span>
    </a>
  );
};

const YearRow = ({
  setDate, start, width = 5, selected
}) => {
  const years = new Array(Number(width)).fill(Number(start)).map((y, i) => y + i);
  return (
    <div className='date-picker__years-row'>
      {years.map(y => (
        <YearEntity
          key={`yr-${y}`}
          year={y}
          label={y % 100}
          selected={selected === y}
          cb={setDate}
        />
      ))}
    </div>
  );
};

const DatePickerYears = ({
  setDate, year, era, length = 10, width = 5
}) => {
  const shift = new Array(length).fill(1).map((s, i) => ((i * width) + era));

  return (
    <div className='date-picker__years'>
      {shift.map(y => (
        <YearRow
          width={width}
          key={`yr-${y}`}
          start={y}
          selected={year}
          setDate={setDate}
        />
      ))}
    </div>
  );
};

export default DatePickerYears;
