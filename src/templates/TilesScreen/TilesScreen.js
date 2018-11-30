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
import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Tile from '../../components/Tile/Tile';
import SetLocalizationToggle from '../../components/SetLocalizationToggle';
import './TilesScreen.less';

@inject('store')
@observer
class TilesScreen extends React.Component {
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  render() {
    const { courses } = this.props;
    return (
      <div className='startpage__container parent'>
        <div className='startpage__langswitch'>
          <SetLocalizationToggle i18n={this.props.store.i18n} />
        </div>
        <div className='starpage__title'>
          <h3>
            {' '}
            {this.props.store.i18n.data.courseSelection.title}
            {' '}
          </h3>
        </div>
        <div className='tile__container'>
          <div className='hex-row'>
            {Object.keys(courses).map(c => (
              <Tile
                key={`courseSelector_id${c}`}
                course={courses[c]}
                lng={this.lng}
              />
            ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TilesScreen;
