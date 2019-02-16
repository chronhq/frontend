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
import settings from '../../settings.json';

const config = ((settings.analytics !== undefined)
  ? {
    ym: { enabled: Boolean(settings.analytics.ym), id: Number(settings.analytics.ym) },
    ga: { enabled: Boolean(settings.analytics.ga), id: settings.analytics.ga },
  }
  : {
    ym: { enabled: false, id: '' },
    ga: { enabled: false, id: '' },
  }
);

export default class AnalyticModel {
  @observable agreement = getCookie().indexOf('gdpr') >= 0;

  @observable config = config;

  @observable goal;

  @action agreeWithPolicy() {
    setCookie('gdpr', true, Date.now());
    this.agreement = true;
    this.metricHit(this.goal);
  }

  @action metricHit(link, c = 0) {
    console.log('Hit', link, c);
    if (!this.agreement) {
      this.goal = link;
      return;
    }
    if (this.config.ym.enabled) {
      setTimeout(() => {
        try {
          ym('hit', link);
        } catch (e) {
          console.error('YM Metrika error', e);
          if (c < 3) this.metricHit(link, c + 1);
        }
      }, 1000);
    }
  }
}
