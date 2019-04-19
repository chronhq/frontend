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
import {
  CreateActionButton, ChangeActionButton
} from '../../components/ActionButtons/ActionButtons';
import DateRangeWidget from '../../components/DateRangeWidget';

import './AdminSTV.less';

const Entity = ({ start, end, status }) => (
  <>
    <span className={`lnr lnr-${status ? 'checkmark' : 'question'}-circle`} />
    <DateRangeWidget start={start} end={end} click={() => null} />
    <ChangeActionButton click={() => true} text='' />
  </>
);

const genDate = () => (new Date(+(new Date()) - Math.floor(Math.random() * 10000000000000)));

const Entities = ({ count = 10 }) => {
  const dates = new Array(count * 2).fill(0).map(genDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const data = new Array(count).fill(0).map((v, i) => {
    const status = Boolean(Math.round(Math.random()));
    const end = dates[i * 2];
    const start = dates[i * 2 + 1];
    const stars = Math.round(Math.random() * 5);
    return {
      status, start, end, stars, key: i
    };
  });
  return (
    <div className='stv-entities-container'>
      {data.map(d => <Entity {...d} />)}
    </div>
  );
};

@inject('store')
@observer
class AdminSTV extends React.Component {
  render() {
    return (
      <AdminWrapper title='Spacetime volume'>
        <p>
          {'Chosen Territorial entity contains the following Spacetime volumes:'}
        </p>
        <Entities />
        <CreateActionButton text='New' click={() => true} />
      </AdminWrapper>
    );
  }
}

export default AdminSTV;
