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

import firebase from 'firebase/app';
import 'firebase/auth';

import AdminWrapper from './AdminWrapper';
import AdminFooterLinks from './AdminFooterLinks';

import { Create, Change, Sandbox } from './AdminIcons';

/* eslint-disable jsx-a11y/anchor-is-valid */

const ActionButton = ({ text, Icon, click }) => (
  <a
    href=''
    onClick={(e) => {
      e.preventDefault();
      click();
      return false;
    }}
    className='actionButton'
  >
    <Icon />
    {' '}
    <span>
      {text}
    </span>
  </a>
);

@inject('store')
@observer
class AdminPanel extends React.Component {
  @computed get auth() {
    return this.props.store.auth;
  }

  @computed get admin() {
    return this.props.store.admin;
  }

  render() {
    return (
      <AdminWrapper title='User Panel'>
        <p>
          {'Profile'}
        </p>
        <p>
          {'Territorial Entity'}
        </p>
        <ActionButton text='New/Edit' Icon={Change} click={() => this.admin.nextScreen('te')} />
        <ActionButton text='Sandbox' Icon={Sandbox} click={() => this.admin.nextScreen('sandbox')} />
        <p>
          {'Narrative'}
        </p>
        <ActionButton text='New' Icon={Create} click={() => true} />
        <ActionButton text='Edit' Icon={Change} click={() => true} />
        <AdminFooterLinks right='Sing Out' rightIsLonger rightClick={() => firebase.auth().signOut()} />
      </AdminWrapper>
    );
  }
}

export default AdminPanel;
