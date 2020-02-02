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

import firebaseConfig from '../../firebase-config.json';
import AdminFormModel from './AdminFormModel';

export default class AuthModel {
  @observable initialized = false;

  @observable firebase = firebaseConfig.config;

  @observable methods = firebaseConfig.methods;

  @observable user;

  @observable token;

  @computed get isSignedIn() {
    return !!this.user;
  }

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
}
