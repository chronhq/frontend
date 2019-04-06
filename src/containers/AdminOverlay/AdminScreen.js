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

import firebase from 'firebase/app';
import 'firebase/auth';

import LoginScreen from './LoginScreen';
import AdminPanel from './AdminPanel';

import './AdminScreen.less';

@inject('store')
@observer
class AdminScreen extends React.Component {
  componentDidMount() {
    this.initFirebase();
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  @computed get auth() {
    return this.props.store.auth;
  }

  @computed get admin() {
    return this.props.store.admin;
  }

  @computed get screen() {
    if (this.admin.screens.panel) return AdminPanel;
    return null;
  }

  @action authStatusChanged(user) {
    this.auth.user = user;
  }

  @action initFirebase() {
    console.log(firebase);
    if (this.auth.initialized === false) {
      firebase.initializeApp(this.auth.firebase);
      this.auth.initialized = true;
    }
    this.unregisterAuthObserver = firebase.auth()
      .onAuthStateChanged(u => this.authStatusChanged(u));
  }

  render() {
    if (!this.auth.initialized) return null;
    if (!this.auth.isSignedIn) return <LoginScreen />;
    const Screen = this.screen;
    return <Screen />;
  }
}

export default AdminScreen;
