/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { observable, action, computed } from 'mobx';

export default class FeedbackForm {
  @computed get glyph() {
    return this.success ? 'lnr lnr-checkmark-circle' : 'lnr lnr-cross';
  }

  @computed get secret() {
    const pi = 314159;
    const ts = Math.floor(Date.now() / 1000);
    const arr = ts.toString().split('');
    const magic = arr.reduce((m, cur) => (Number(cur) === 0 ? m : m * cur), 1);
    const params = `p=${ts * pi}&m=${magic * this.text.length}`;
    return params;
  }

  @computed get body() {
    return [
      this.secret,
      'type=MapMistake',
      `title=${encodeURI(this.title)}`,
      `email=${encodeURI(this.email)}`,
      `year=${encodeURI(this.year)}`,
      `layer=${encodeURI(this.layer)}`,
      `text=${encodeURI(this.text)}`
    ].join('&');
  }

  @observable visible = false;

  @observable success = false;

  @observable layer = '';

  @observable year = '';

  @observable title = '';

  @observable ref = '';

  @observable email = '';

  @observable text = '';

  @observable agreement = 0;

  @observable layer;

  @observable year;

  @computed get validation() {
    return this.agreement && this.layer && this.year && this.text && this.email;
  }

  @action wipe() {
    this.name = '';
    this.title = '';
    this.text = '';
    this.ref = '';
  }

  @action result(val) {
    this.visible = true;
    this.success = val;
  }

  @action submit() {
    const url = '/shared/feedback';
    const req = {
      method: 'POST',
      credentials: 'same-origin',
      body: this.body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch(url, req).then(action((response) => {
      try {
        response.json().then((j) => {
          this.result(j.success);
          if (j.success) {
            this.wipe();
          }
        });
      } catch (e) {
        this.result(false);
        console.log('err', e, response);
      }
    }))
      .catch(action((error) => {
        this.result(false);
        console.log('err', error);
      }));
  }
}
