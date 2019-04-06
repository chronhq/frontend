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

import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

import Button, { BUTTON_TYPE, BUTTON_SIZE } from '../../components/Button/Button';
import AdminHeader from './AdminHeader';


@inject('store')
@observer
class LoginScreen extends React.Component {
  @computed get auth() {
    return this.props.store.auth;
  }

  @computed get uiConfig() {
    return {
      signInFlow: 'popup',
      signInOptions: this.auth.methods.map(m => firebase.auth[m].PROVIDER_ID),
      callbacks: {
        signInSuccessWithAuthResult: () => false
      },
      // firebaseui.auth.CredentialHelper.NONE === 'none'
      credentialHelper: 'none',
    };
  }

  render() {
    return (
      <div>
        <AdminHeader title='Log In' />
        {this.auth.isSignedIn
          ? (
            <Button
              btnType={BUTTON_TYPE.BASIC}
              btnSize={BUTTON_SIZE.WIDE}
              onClick={() => firebase.auth().signOut()}
            >
              <span className='lnr lnr-exit' aria-hidden='true'>
                {'Log out'}
              </span>
            </Button>
          )
          : <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        }
      </div>
    );
  }
}

export default LoginScreen;
