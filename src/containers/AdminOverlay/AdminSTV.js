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
import ActionButton, {
  CreateActionButton, ChangeActionButton
} from '../../components/ActionButtons/ActionButtons';
import TwoActions from '../../components/TwoActions/TwoActions';

const Entity = ({ id, start, end }) => (
  <div className='stvEntity'>
    <div className='actionButton'>
      <span>
        {id}
        {'> '}
        {start}
        {'-'}
        {end}
      </span>
    </div>
    <span>
      <ChangeActionButton click={() => true} text='Edit' />
      <ActionButton click={() => true} text='Download' />
    </span>
  </div>
);

@inject('store')
@observer
class AdminSTV extends React.Component {
  render() {
    return (
      <AdminWrapper title='Spacetime volume'>
        <p>
          {'Chosen Territorial entity contains the following Spacetime volumes:'}
        </p>
        <Entity id='1' start='1998' end='1999' />
        <Entity id='1' start='1999' end='2000' />
        <CreateActionButton text='New' click={() => true} />
        <TwoActions
          left='Back'
          leftClick={() => this.props.store.admin.nextScreen('te')}
        />
      </AdminWrapper>
    );
  }
}

export default AdminSTV;
