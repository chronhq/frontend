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
  action,
  computed
} from 'mobx';
import axios from 'axios';
import ym from 'react-yandex-metrika';
import ReactGA from 'react-ga';

import { getCookie, setCookie } from '../utils/localStorage';

const YM_CONFIG = {
  defer: false,
  clickmap: true,
  trackLinks: true,
  // accurateTrackBounce: true,
  webvisor: true,
  trackHash: false
};

export default class AnalyticModel {
  @observable agreement = false;

  @observable goal;

  @observable tokens = {
    ym: '',
    ga: '',
  };

  @action agreeWithPolicy() {
    setCookie('gdpr', true, Date.now());
    this.agreement = true;
    this.initGA();
    this.metricHit(this.goal);
  }

  @computed get config() {
    return {
      ym: {
        enabled: Boolean(this.tokens.ym),
        id: Number(this.tokens.ym),
        config: YM_CONFIG
      },
      ga: {
        enabled: Boolean(this.tokens.ga),
        id: this.tokens.ga,
        config: {}
      },
    };
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
            category: 'UserBehaviour',
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
    // Init GA component and start tracking
    if (this.config.ga.enabled) {
      window[`ga-disable-${this.config.ga.id}`] = false;
      ReactGA.initialize(this.config.ga.id, this.config.ga.config);
    }
  }


  @action async fetchConfiguration() {
    const { data } = await axios({ url: '/analytics-config.json', method: 'GET' });
    this.tokens = data;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    // Disable GA tracking
    window[`ga-disable-${this.config.ga.id}`] = true;
    this.fetchConfiguration().then(() => {
      if (getCookie().indexOf('gdpr') >= 0) {
        this.agreement = true;
        this.initGA();
      }
    });
  }
}
