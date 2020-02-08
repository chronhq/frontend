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

import OptionsList from './OptionsList';
import SelectFiles from './SelectFiles';
import { GiantActionButtonFillText } from '../../../components/ActionButtons/ActionButtons';

import './UploadWidget.less';
import AdminTESearchBar from '../../../components/AdminTESearchBar/AdminTESearchBar';

const ProgressBar = ({ progress, total = 10, current = 5 }) => (
  <div className='progress-bar__container'>
    <div
      className='progress-bar__fill'
      style={{ width: `${progress !== undefined ? progress : (current / total) * 100}%` }}
    />
  </div>
);

@inject('store')
@observer
class UploadWidget extends React.Component {
  @computed get screen() {
    switch (this.props.form.stage) {
      case 'edit':
        return (
          <>
            <div>
              <AdminTESearchBar
                iconLabel='Add'
                icon='save--light'
                // search
              />
              <OptionsList
                options={['ref1sdfsadfsadf', 'ref2sadasdsad', 'ref3asw332ddsasaddd']}
                selectOptions={this.props.form.addReferences}
              />
            </div>
            <GiantActionButtonFillText
              click={this.props.form.upload}
              icon='save--blue'
              text='Save'
            />
          </>
        );
      case 'uploading':
        return (
          <>
            <div>
              <OptionsList
                options={this.props.form.files}
                selectOptions={() => null}
              />
              <div style={{ display: 'flex' }}>
                <ProgressBar progress={this.props.form.form.progress} />
                {` ${this.props.form.form.progress}%`}
              </div>
            </div>
            {this.props.form.uploadError && (
              <GiantActionButtonFillText
                click={this.props.form.upload}
                icon='redo--blue'
                text='Try Again'
              />
            )}
          </>
        );
      case 'ready':
        return (
          <>
            <OptionsList
              options={this.props.form.files}
              selectOptions={this.props.form.selectFiles}
            />
            <GiantActionButtonFillText
              click={this.props.form.upload}
              icon='upload--blue'
              text='Upload'
            />
          </>
        );
      case 'select':
      default:
        return (
          <>
            <div />
            <SelectFiles
              accept='.json, .geojson'
              multiple={false}
              selectFiles={this.props.form.selectFiles}
            />
          </>
        );
    }
  }

  render() {
    return (
      <div>
        <div className='upload-widget'>
          {this.screen}
        </div>
        <div style={{ textAlign: 'center' }} className='admin-stv-card-main__font'>
          {this.props.form.message}
        </div>
      </div>
    );
  }
}

export { ProgressBar };

export default UploadWidget;
