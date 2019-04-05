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
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

// import firebase from '@firebase/app';
// import '@firebase/auth';

import firebase from 'firebase/app';
import 'firebase/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import AdminHeader from './AdminHeader';

import './AdminScreen.less';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInSuccess: (a) => {
    console.log('Wowowwow sign in');
    console.log('a', a);
  },

  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

@inject('store')
@observer
class AdminScreen extends React.Component {
  componentDidMount() {
    this.initFirebase();
  }

  @computed get auth() {
    return this.props.store.auth;
  }

  @action initFirebase() {
    console.log(firebase);
    if (this.auth.initialized === false) {
      firebase.initializeApp(this.auth.firebase);
      this.auth.initialized = true;
    }
  }

  @action close() {
    this.props.store.flags.runtime.set('admin', false);
  }

  render() {
    if (this.auth.initialized === false) return null;
    return (
      <div className='adminContainer'>
        <AdminHeader title='Log In' close={() => this.close()} />
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}

export default AdminScreen;
