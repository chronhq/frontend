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
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import AdminWrapper from './AdminWrapper';
import AdminFooterLinks from './AdminFooterLinks';
import { CreateActionButton } from './AdminActionButtons';
import ColorPicker from './ColorPicker';
import { InputSelect } from '../../components/Input';

@inject('store')
@observer
class AdminTE extends React.Component {
  @observable color = 1;

  @action changeColor(c) {
    this.color = c;
  }

  render() {
    return (
      <AdminWrapper title='Territorial Entity'>
        <p>
          {'Select color'}
        </p>
        <p>
          {'Set up political relations'}
        </p>
        <ColorPicker selected={this.color} changeColor={c => this.changeColor(c)} />
        <InputSelect
          value='Fair'
          placeholder='Data quality'
          options={['Fair', 'Good', 'Excellent']}
          cb={value => console.log('cb', value)}
        />
        <CreateActionButton text='New' click={() => true} />
        <AdminFooterLinks
          left='Back'
          leftClick={() => this.props.store.admin.nextScreen('panel')}
          right='Save'
        />
        <AdminFooterLinks
          left='Delete'
          right='Continue to STV'
          rightClick={() => this.props.store.admin.nextScreen('stv')}
          rightIsLonger
        />
      </AdminWrapper>
    );
  }
}

export default AdminTE;
