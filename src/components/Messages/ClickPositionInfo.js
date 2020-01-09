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
import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';

import Tooltip from '../Tooltip/Tooltip';

@inject('store')
@observer
class ClickPositionInfo extends React.Component {
  @observable copied = false;

  @observable textRef = '';

  copy = action(() => {
    if (document.queryCommandSupported('copy')) {
      this.textRef.select();
      document.execCommand('copy');
      this.copied = true;
    } else {
      console.error('copy method is not supported in your browser');
    }
  })

  @computed get messages() {
    return this.props.store.i18n.data.messages;
  }

  @computed get tooltip() {
    return this.copied
      ? this.messages.positionCopied
      : this.messages.positionCopy;
  }

  @computed get clickPosition() {
    return this.props.store.balloon.clickPosition;
  }

  @computed get lat() {
    return `Lat: ${this.clickPosition.lat}`;
  }

  @computed get lng() {
    return `Lng: ${this.clickPosition.lng}`;
  }

  render() {
    return (
      <Tooltip placement='bottom' content={this.tooltip}>
        <div
          onClick={() => this.copy()}
          onKeyPress={() => this.copy()}
          role='button'
          tabIndex={0}
        >
          <textarea
            readOnly
            style={{ position: 'absolute', left: '-9999px' }}
            ref={(r) => { this.textRef = r; return false; }}
            value={`${this.lat}, ${this.lng}`}
          />
          <p>
            {this.lat}
          </p>
          <p>
            {this.lng}
          </p>
        </div>
      </Tooltip>
    );
  }
}

export default ClickPositionInfo;
