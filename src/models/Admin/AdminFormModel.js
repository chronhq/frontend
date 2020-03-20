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

  @observable reqData = {};

  @observable reqOverwrite = {};

  constructor(auth, url, method, onResult, onComplete = () => null) {
    this.auth = auth;
    this.url = url;
    this.method = method;
    this.onResult = onResult;
    this.onComplete = onComplete;
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

  @action onProgress = (progressEvent) => {
    const { total, loaded } = progressEvent;
    const percent = (Math.round((loaded / total) * 10000) / 100);
    this.progress = percent.toFixed(percent === 100 ? 0 : 1);
    if (loaded === total) this.onComplete(progressEvent);
  }

  submit = async (data, overwrite = {}) => {
    await this.auth.syncToken(true);
    const { headers } = this.auth;

    this.reqData = data;
    this.reqOverwrite = overwrite;

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          data[key].forEach((v) => {
            formData.append(key, v);
          });
        } else {
          formData.set(key, data[key]);
        }
      });
    }

    const url = overwrite.url || this.url;
    const method = overwrite.method || this.method;

    const d = method.match(/DELETE/i) ? {} : { data: formData };
    axios({
      url,
      method,
      headers,
      ...d,
      onUploadProgress: this.onProgress,
    })
      .then(this.onSuccess)
      .catch(this.onError);
  }
}
