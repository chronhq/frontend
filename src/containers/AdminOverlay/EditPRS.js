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
import { inject, observer } from 'mobx-react';

import AdminWrapper from './AdminWrapper';
import DateRangeWidget from '../../components/ActionButtons/DateRangeWidget';
import { CreateActionButton } from '../../components/ActionButtons/ActionButtons';

import './EditPRS.less';

const genDate = () => (new Date(+(new Date()) - Math.floor(Math.random() * 10000000000000)));

const Entity = ({ start, end }) => (
  <div className='prs-row-grid'>
    <p>
      {'TE label for PR'}
    </p>
    <div className='prs-col-grid'>
      <DateRangeWidget start={start} end={end} click={() => null} />
      <span className='lnr lnr-cross-circle' />
    </div>
  </div>
);


const Entities = ({ title }) => {
  const count = Math.round(Math.random() * 10);
  const dates = new Array(count * 2).fill(0).map(genDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const data = new Array(count).fill(0).map((v, i) => {
    const end = dates[i * 2];
    const start = dates[i * 2 + 1];
    return { start, end };
  });

  return (
    <div>
      <p>{title}</p>
      <div className='prs-container'>
        {data.map(d => <Entity {...d} />)}
      </div>
      <CreateActionButton text='Add' click={() => null} />
    </div>
  );
};

@inject('store')
@observer
class EditPRS extends React.Component {
  render() {
    return (
      <AdminWrapper title='Edit PRS' position='middle'>
        <div className='prs'>
          <Entities title='Direct' />
          <Entities title='Indirect' />
          <Entities title='Group' />
        </div>
      </AdminWrapper>
    );
  }
}

export default EditPRS;
