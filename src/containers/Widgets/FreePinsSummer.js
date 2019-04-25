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
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import Tooltip from '../../components/Tooltip/Tooltip';

import './FreePinsSummer.less';

const tooltip = [
  'Some events loaded from Wikidata doesn’t have coordinates.',
  'Contribute to Chron by fixing these issues on Wikidata.'].join(' ');

@inject('store')
@observer
class FreePinsWidget extends React.Component {
  prevStatus = false;

  @computed get pins() {
    return this.props.store.pins.freePins;
  }

  @computed get cachedData() {
    return this.props.store.data.cachedData;
  }

  @computed get status() {
    if (this.cachedData.status.loaded) {
      this.prevStatus = Object.keys(this.cachedData.data).length === 0;
    }
    return this.prevStatus;
  }

  setBalloon = (icon, e, force = false) => {
    const { pageX, pageY } = e;
    const a = { wikidata_id: icon.key, type: icon.type };
    this.props.store.balloon.setPinBalloon(a, true, force);
    this.props.store.balloon.setPosition(pageX, pageY);
    return true;
  }

  render() {
    return this.status ? null : (
      <div className='free-pins-container'>
        <Tooltip placement='right' content={tooltip}>
          <div className='free-pins-attention'>
            <span>Events without coordinates</span>
          </div>
        </Tooltip>
        <div className='free-pins-grid'>
          {
            this.pins.map(icon => (
              <span
                key={icon.key}
                role='button'
                tabIndex={0}
                onKeyDown={e => this.setBalloon(icon, e, true)}
                onMouseEnter={e => this.setBalloon(icon, e)}
                onClick={e => this.setBalloon(icon, e, true)}
                onMouseLeave={() => this.props.store.balloon.pinned === false
                  && this.props.store.balloon.setPinBalloon(null)}
                onMouseMove={e => this.setBalloon(icon, e)}
                className={`sprite sprite-${icon.type}`}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default FreePinsWidget;
