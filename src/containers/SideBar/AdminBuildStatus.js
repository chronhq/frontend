/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import axios from 'axios';

import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';

import TwoActions from '../../components/TwoActions/TwoActions';
import ActionButton from '../../components/ActionButtons/ActionButtons';
import ExtraSideMenu from './ExtraSideMenu';
import Tooltip from '../../components/Tooltip/Tooltip';

@observer
class AdminBuildStatus extends React.Component {
  @observable last = 0;

  @observable running = false;

  @observable duration = 0;

  @observable updates = [];

  timeout = '';

  updateInterval = 30000;

  componentDidMount() {
    this.sendRequest();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  @computed get updatesAvailable() {
    return !this.running && this.updates.length > 0;
  }

  @computed get lastDate() {
    const d = new Date(this.last * 1000);
    const options = {
      hour12: false,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Intl.DateTimeFormat(window.navigator.language || 'en-US', options).format(d);
  }

  @computed get statusBlock() {
    const style = `update-status ${this.running ? '' : 'update-status--inactive'}`;
    const res = (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center'
      }}
      >
        <div className={style} />
        <div className='text__narrative--menu'>{this.running ? 'Running' : 'Stopped'}</div>
      </div>
    );

    return this.running ? (
      <Tooltip placement='bottom' content={`Duration ${this.duration}s`}>
        {res}
      </Tooltip>
    ) : res;
  }

  sendRequest = (method = 'GET') => {
    const ts = Number(new Date());
    const url = `/status/mvt?ts=${ts}`;
    axios({ url, method })
      .then((response) => {
        console.log(response);
        const { data } = response;
        if (data) {
          Object.keys(data).forEach(action((k) => {
            this[k] = data[k];
          }));
        }
      })
      .catch((error) => {
        // handle error
        console.log('Request Failed', url, method, error);
      })
      .then(() => {
        this.timeout = setTimeout(() => this.sendRequest(), this.updateInterval);
      });
  }

  render() {
    return (
      <ExtraSideMenu
        key='layer_update'
        tooltip='Update'
        extraClassName='menu-update'
        wrapper='side-bar__desktop'
        name='update'
      >
        <div className='text__narrative--body'>
          Tiles and maps synchronization status
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            <div className='text__narrative--menu'>
              All uploaded or changed maps on the server must be converted to the
              {' '}
              <a href="https://docs.mapbox.com/vector-tiles/reference/">Mapbox Vector Tiles</a>
              {' '}
              format. After conversion they will be shown in narrative interface.
              {' '}
              The process will require some time, around 30 minutes to process all data (Rebuild),
              and less for partial update (Patch).
            </div>
            <div className='text__narrative--menu'>
              Last synchronization was
              {' '}
              {this.lastDate}
              {'. '}
              {this.updates.length === 0 ? 'No updates available' : `Available ${this.updates.length} changes`}
            </div>
          </div>
          {this.statusBlock}
        </div>
        <TwoActions>
          <ActionButton text='Rebuild' icon='recycle' click={() => this.sendRequest('PUT')} enabled={!this.running} />
          <ActionButton text='Patch' icon='save' click={() => this.sendRequest('PATCH')} enabled={this.updatesAvailable} />
        </TwoActions>
      </ExtraSideMenu>
    );
  }
}

export default AdminBuildStatus;
