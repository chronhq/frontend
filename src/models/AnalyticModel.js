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
import ReactGA from 'react-ga';

import { getCookie, setCookie } from '../utils/localStorage';
import settings from '../../settings.json';

const YM_CONFIG = {
  defer: false,
  clickmap: true,
  trackLinks: true,
  // accurateTrackBounce: true,
  webvisor: true,
  trackHash: false
};

const config = ((settings.analytics !== undefined)
  ? {
    ym: {
      enabled: Boolean(settings.analytics.ym),
      id: Number(settings.analytics.ym),
      config: YM_CONFIG
    },
    ga: {
      enabled: Boolean(settings.analytics.ga),
      id: settings.analytics.ga,
      config: {}
    },
  }
  : {
    ym: { enabled: false, id: '', config: {} },
    ga: { enabled: false, id: '', config: {} },
  }
);

export default class AnalyticModel {
  @observable agreement = false;

  @observable config = config;

  @observable goal;

  @action agreeWithPolicy() {
    setCookie('gdpr', true, Date.now());
    this.agreement = true;
    this.initGA();
    this.metricHit(this.goal);
  }

  ymHit = (link, c = 0) => {
    if (this.config.ym.enabled) {
      setTimeout(() => {
        try {
          ym('reachGoal', link);
        } catch (e) {
          console.error('YM Metrika error', e);
          if (c < 3) this.ymHit(link, c + 1);
        }
      }, 1000);
    }
  }

  gaHit = (link, c = 0) => {
    if (this.config.ga.enabled) {
      setTimeout(() => {
        try {
          ReactGA.event({
            category: 'User',
            action: link
          });
        } catch (e) {
          console.error('GA Error', e);
          if (c < 3) this.gaHit(link, c + 1);
        }
      }, 1000);
    }
  }

  metricHit = (link) => {
    if (!this.agreement) {
      this.goal = link;
      return;
    }
    this.ymHit(link);
    this.gaHit(link);
  }

  initGA = () => {
    if (this.config.ga.enabled) {
      ReactGA.initialize(this.config.ga.id, this.config.ga.config);
    }
  }

  constructor() {
    if (getCookie().indexOf('gdpr') >= 0) {
      this.agreement = true;
      this.initGA();
    }
  }
}
