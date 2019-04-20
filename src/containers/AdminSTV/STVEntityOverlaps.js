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

import ActionButton from '../../components/ActionButtons/ActionButtons';
import DateRangeWidget from '../../components/DateRangeWidget';

import './STVEntityOverlaps.less';

const Problem = ({ label, start, end }) => (
  <div className='stv-entity-overlap-problem'>
    <div className='stv-entity-overlap-problem--label'>
      {label}
    </div>
    <div className='stv-entity-overlap-problem--row'>
      <DateRangeWidget start={start} end={end} />
    </div>
    <div className='stv-entity-overlap-problem--row'>
      <div className='stv-entity-overlap-problem--solution'>
        <ActionButton text='Yes' click={() => null} />
      </div>
      <div className='stv-entity-overlap-problem--solution stv-entity-overlap-problem--solution__selected'>
        <ActionButton text='No' click={() => null} />
      </div>
    </div>
  </div>
);

class Overlaps extends React.Component {
  render() {
    return (
      <div className='stv-entity-overlap'>
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          {this.props.overlaps.length}
          {' '}
          {'Overlaps'}
        </div>
        <div>
          {'Subtract overlap from:'}
        </div>
        {this.props.overlaps.map(o => <Problem {...o} />)}
      </div>
    );
  }
}

export default Overlaps;
