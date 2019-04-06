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
import { computed } from 'mobx';

import AdminWrapper from './AdminWrapper';
import AdminFooterLinks from './AdminFooterLinks';

import { Create, Change, Sandbox } from './AdminIcons';

const ActionButton = ({ text, Icon }) => (
  <div className='actionButton'>
    <Icon />
    {' '}
    <span>
      {text}
    </span>
  </div>
);
@inject('store')
@observer
class AdminPanel extends React.Component {
  @computed get auth() {
    return this.props.store.auth;
  }

  render() {
    return (
      <AdminWrapper title='User Panel'>
        <div className='adminContent'>
          <p>
            {'Profile'}
          </p>
          <p>
            {'Territorial Entity'}
          </p>
          <ActionButton text='New/Edit' Icon={Change} />
          <ActionButton text='Sandbox' Icon={Sandbox} />
          <p>
            {'Narrative'}
          </p>
          <ActionButton text='New' Icon={Create} />
          <ActionButton text='Edit' Icon={Change} />
          <AdminFooterLinks right='Sing Out' rightIsLonger />
        </div>
      </AdminWrapper>
    );
  }
}

export default AdminPanel;
