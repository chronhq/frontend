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
import { observable, computed, action } from 'mobx';
import axios from 'axios';

import AdminFormModel from './Admin/AdminFormModel';

export default class AuthModel {
  @observable ready = false;

  @observable initialized = false;

  @computed get firebase() {
    return this.firebaseConfig.config;
  }

  @computed get methods() {
    return this.firebaseConfig.methods;
  }

  @observable user;

  @observable token;

  @computed get isSignedIn() {
    return !!this.user;
  }

  @observable firebaseConfig = {
    config: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
    },
    methods: ['GoogleAuthProvider', 'FacebookAuthProvider', 'TwitterAuthProvider', 'EmailAuthProvider']
  };

  @computed get headers() {
    if (!this.token) {
      this.syncToken();
    }

    return {
      Authorization: `JWT ${this.token}`
    };
  }

  @action syncToken = async (force) => {
    try {
      const t = await this.user.getIdToken(force);
      this.token = t;
    } catch (e) {
      console.error('Problem with token', e);
    }
  }

  createForm = (
    url, method, onResult, onComplete
  ) => new AdminFormModel(this, url, method, onResult, onComplete);

  @action async fetchConfiguration() {
    const { data } = await axios({ url: '/firebase-config.json', method: 'GET' });
    this.firebaseConfig = data;
    this.ready = true;
  }

  constructor() {
    this.fetchConfiguration();
  }
}
