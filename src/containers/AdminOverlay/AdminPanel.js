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

import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import TwoActions from '../../components/TwoActions/TwoActions';

import ActionButton, {
  CreateActionButton, ChangeActionButton, SandboxActionButton
} from '../../components/ActionButtons/ActionButtons';

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
          {'Hello, '}
          {this.auth.user.displayName}
        </p>
        <p>
          {'Territorial Entity'}
        </p>
        <ChangeActionButton text='New/Edit' click={() => this.admin.nextScreen('te')} />
        <SandboxActionButton text='Sandbox' click={() => this.admin.nextScreen('sandbox')} />
        <p>
          {'Narrative'}
        </p>
        <CreateActionButton text='New' click={() => true} />
        <ChangeActionButton text='Edit' click={() => true} />
        <TwoActions>
          <></>
          <ActionButton icon='exit' text='Sign Out' click={() => firebase.auth().signOut()} />
        </TwoActions>

      </AdminWrapper>
    );
  }
}

export default AdminPanel;
