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
import { inject, observer } from 'mobx-react';

import { DateFromJulian } from '../../components/DatePicker/DatePicker';
import { ActionButtonFill } from '../../components/ActionButtons/ActionButtons';

@inject('store')
@observer
class AdminSTVCard extends React.Component {
  render() {
    return (
      <div className='stv-entity admin-stv-card-main__font'>
        <div className='stv-entity--grid'>
          <div className='stv-entity--dates'>
            <div><DateFromJulian date={this.props.stv.start_date} /></div>
            <div><DateFromJulian date={this.props.stv.end_date} /></div>
          </div>
          <div className='stv-entity--vc'>
            <div className='stv-entity--overflow'>{this.props.stv.visual_center.coordinates[0]}</div>
            <div className='stv-entity--overflow'>{this.props.stv.visual_center.coordinates[1]}</div>
          </div>
          <div className='stv-entity--source'>
            <div className='stv-entity--overflow'>https://medium.com/@melih193/react-with-react-router-5-9bdc9d427bfd</div>
            <div className='stv-entity--overflow'>https://medium.com/@melih193/react-with-react-router-5-9bdc9d427bfd</div>
          </div>
          <div className='stv-entity--buttons'>
            <ActionButtonFill
              click={() => console.log('Click download')}
              text=''
              icon='download--blue'
              style={{ height: '2rem', width: '2rem', backgroundColor: 'transparent' }}
            />
            <ActionButtonFill
              click={() => console.log('Click delete')}
              text=''
              icon='delete--blue'
              style={{ height: '2rem', width: '2rem', backgroundColor: 'transparent' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSTVCard;
