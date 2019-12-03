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
import PropTypes from 'prop-types';

import './RadioButton.less';


const RadioButton = ({ selected, select, label }) => (
  <div
    className='rbtn'
    onClick={() => select()}
    onKeyPress={() => select()}
    tabIndex={0}
    role='button'
  >
    <div className='rbtn__container'>
      <div className={`rbtn__marker rbtn__marker--hover ${selected ? 'rbtn__marker--selected' : ''}`} />
    </div>
    <div className='rbtn__label rbtn__label--hover'>
      {label}
    </div>
  </div>
);

RadioButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default RadioButton;
