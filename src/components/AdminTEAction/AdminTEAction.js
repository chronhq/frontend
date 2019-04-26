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

import DateRangeWidget from '../DatePicker/DateRangeWidget';
import './AdminTEAction.less';

const TEAction = ({
  label, start, end, click = () => null, checked, icon, noClick
}) => {
  const teAction = `te-action ${checked ? '' : 'te-action--dimmed'}`;
  const teActionButton = [
    `lnr lnr-${icon}`,
    'te-action__button',
    checked ? '' : 'te-action__button--dimmed',
    noClick ? 'te-action__button--no-click' : '',
  ].join(' ');

  return (
    <div className={teAction}>
      <div>
        <div className='te-action__label'>
          {label}
        </div>
        <DateRangeWidget start={start} end={end} />
      </div>
      <div
        role='button'
        tabIndex={0}
        onClick={click}
        onKeyDown={click}
        className={teActionButton}
      />
    </div>
  );
};

TEAction.defaultProps = {
  noClick: false,
  click: () => null,
  checked: true,
  icon: 'cross-circle'
};

TEAction.propTypes = {
  label: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  click: PropTypes.func,
  checked: PropTypes.bool,
  noClick: PropTypes.bool,
  icon: PropTypes.string,
};

export default TEAction;
