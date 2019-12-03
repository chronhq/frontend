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
import { computed, action } from 'mobx';

import firebase from 'firebase/app';
import 'firebase/auth';

import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';

import TwoActions from '../../components/TwoActions/TwoActions';
import ActionButton from '../../components/ActionButtons/ActionButtons';
import disabled from '../../../disabled.json';

import './LoginScreen.less';

@inject('store')
@observer
class LoginScreen extends React.Component {
  @computed get auth() {
    return this.props.store.auth;
  }

  @computed get uiConfig() {
    return {
      signInFlow: 'popup',
      signInOptions: this.auth.methods.map((m) => firebase.auth[m].PROVIDER_ID),
      callbacks: {
        signInSuccessWithAuthResult: () => false
      },
      // firebaseui.auth.CredentialHelper.NONE === 'none'
      credentialHelper: 'none',
    };
  }

  @computed get skip() {
    return disabled.login
      ? () => (
        <TwoActions>
          <ActionButton text='Let Me Through' click={() => this.dummyUser()} />
          <></>
        </TwoActions>
      )
      : () => null;
  }

  @action dummyUser() {
    this.auth.user = {};
  }

  render() {
    const Skip = this.skip;
    return (
      <AdminWrapper title='Log In'>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        <Skip />
      </AdminWrapper>
    );
  }
}

export default LoginScreen;
