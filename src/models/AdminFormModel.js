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
import { action, observable } from 'mobx';
import axios from 'axios';

export default class AdminFormModel {
  @observable method;

  @observable url;

  @observable progress;

  @observable status;

  @observable response;

  constructor(auth, url, method, onResult) {
    this.auth = auth;
    this.url = url;
    this.method = method;
    this.onResult = onResult;
  }

  @action onSuccess = (ret) => {
    console.log('onSuccess', ret);
    this.response = ret;
    this.onResult(this, false);
  }

  @action onError = (err) => {
    console.log('onError', err);
    this.response = err;
    this.onResult(this, true);
  }

  @action onProgress = (total, loaded) => {
    const percent = (Math.round((loaded / total) * 10000) / 100);
    this.progress = percent.toFixed(percent === 100 ? 0 : 1);
  }

  submit = async (data) => {
    await this.auth.syncToken(true);
    const { headers } = this.auth;

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(this.url, formData, {
        headers,
        onUploadProgress: ({ total, loaded }) => {
          this.onProgress(total, loaded);
        },
      })
      .then(this.onSuccess)
      .catch(this.onError);
  }
}
