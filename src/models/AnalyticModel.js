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

import {
  observable,
  action
} from 'mobx';
import ym from 'react-yandex-metrika';

import { getCookie, setCookie } from '../utils/localStorage';

export default class AnalyticModel {
  @observable agreement = getCookie().indexOf('gdpr') >= 0;

  @action agreeWithPolicy() {
    setCookie('gdpr', true, Date.now());
    this.agreement = true;
  }

  @action metricHit(link) {
    if (!this.agreement) {
      return;
    }
    setTimeout(() => {
      try {
        ym('hit', link);
      } catch (e) {
        console.error('YM Metrika error', e);
        this.metricHit(link);
      }
    }, 1000);
  }
}
