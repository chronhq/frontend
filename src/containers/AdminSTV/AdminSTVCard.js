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
import { ConfirmationWindow } from '../../components/ModalWindow/ModalWindow';
import Tooltip from '../../components/Tooltip/Tooltip';

@inject('store')
@observer
class AdminSTVCard extends React.Component {
  @observable removing = false;

  @observable isOpen = false;

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

  preview = action(() => {
    if (!this.previewIsSet) {
      this.props.store.mapStyle.visibleSTVs = [this.props.stv.id];
      if (this.props.stv.visual_center.coordinates) {
        this.props.store.deck.moveCamera(
          this.props.stv.visual_center.coordinates,
          this.props.store.deck.zoom
        );
      }
    } else {
      this.props.store.mapStyle.visibleSTVs = [];
    }
  })

  @computed get previewIsSet() {
    const { visibleSTVs } = this.props.store.mapStyle;
    if (visibleSTVs.length > 0) {
      return visibleSTVs[0] === this.props.stv.id;
    }
    return false;
  }

  @computed get te() {
    return this.props.store.data.territorialEntities.data[this.props.entity];
  }

  render() {
    return (
      <div className='stv-entity admin-stv-card-main__font'>
        <ConfirmationWindow
          text='Do you want to delete this territory?'
          isOpen={this.isOpen}
          confirm={this.clickDelete}
          cancel={action(() => { this.isOpen = false; })}
        />
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
            <Tooltip placement='bottom' content='Preview'>
              <ActionButtonFill
                click={this.preview}
                text=''
                icon={this.previewIsSet ? 'no-eye--blue' : 'eye--blue'}
                style={{ height: '2rem', width: '2rem', backgroundColor: 'transparent' }}
              />
            </Tooltip>
            <Tooltip placement='bottom' content='Download'>
              <ActionButtonFill
                click={() => this.ref.click()}
                text=''
                icon='download--blue'
                style={{ height: '2rem', width: '2rem', backgroundColor: 'transparent' }}
              />
            </Tooltip>
            <Tooltip placement='bottom' content='Delete'>
              <ActionButtonFill
                click={action(() => { this.isOpen = true; })}
                className={this.removing ? 'fly-away' : ''}
                disabled={this.removing}
                text=''
                icon='delete--blue'
                style={{ height: '2rem', width: '2rem', backgroundColor: 'transparent' }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSTVCard;
