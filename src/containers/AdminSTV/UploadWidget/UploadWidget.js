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
import { ActionButtonFillText } from '../../../components/ActionButtons/ActionButtons';

import './UploadWidget.less';

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
  @computed get stage() {
    // if (this.props.edit) return 'edit';
    if (this.props.progress) return 'uploading';
    return !this.props.files.length ? 'select' : 'ready';
  }

  @computed get screen() {
    switch (this.stage) {
      case 'uploading':
        return (<ProgressBar progress={this.props.progress} />);
      case 'ready':
        return (
          <>
            <OptionsList
              options={this.props.files}
              selectOptions={this.props.selectFiles}
            />
            <ActionButtonFillText
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              click={() => null}
              icon='upload--blue'
              size='4rem'
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
              selectFiles={this.props.selectFiles}
            />
          </>
        );
    }
  }

  render() {
    return (
      <div className='upload-widget'>
        {this.screen}
      </div>
    );
  }
}

export { ProgressBar };

export default UploadWidget;
