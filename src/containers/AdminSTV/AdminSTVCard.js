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
import { observable, action, computed } from 'mobx';

import { DateFromJulian } from '../../components/DateInput/DatePicker';
import { ActionButtonFill } from '../../components/ActionButtons/ActionButtons';

@inject('store')
@observer
class AdminSTVCard extends React.Component {
  @observable removing = false;

  @observable form;

  clickDelete = action(() => {
    this.removing = 1;
    this.form = this.props.store.auth.createForm(
      `/api/spacetime-volumes/${this.props.stv.id}/`,
      'delete',
      action((context, error) => {
        this.removing = false;
        if (error && context.response.response.status !== 410) {
          const { response } = context.response;
          console.log('Error during upload', response);
        } else {
          this.te.stv_count -= 1;
          this.te.stvs = this.te.stvs.filter((c) => c.id !== this.props.stv.id);
        }
      })
    );
    this.form.submit(undefined);
  });

  @computed get te() {
    return this.props.store.data.territorialEntities.data[this.props.entity];
  }

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
            {this.props.stv.references.map((r, idx) => (
              <a target='_blank' rel="noopener noreferrer" key={`sr_${idx + 0}`} className='stv-entity--overflow' href={r}>
                {r}
              </a>
            ))}
          </div>
          <div className='stv-entity--buttons'>
            <a
              href={`/api/spacetime-volumes/${this.props.stv.id}/download`}
              target='_blank'
              rel='noopener noreferrer'
              ref={(r) => { this.ref = r; }}
              style={{ visibility: 'hidden', position: 'absolute' }}
            >
              Download STV
            </a>
            <ActionButtonFill
              click={() => this.ref.click()}
              text=''
              icon='download--blue'
              style={{ height: '2rem', width: '2rem', backgroundColor: 'transparent' }}
            />
            <ActionButtonFill
              click={() => this.clickDelete()}
              className={this.removing ? 'fly-away' : ''}
              disabled={this.removing}
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
