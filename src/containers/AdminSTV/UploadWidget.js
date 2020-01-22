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
import Upload from 'rc-upload';
import { observer, inject } from 'mobx-react';

import { ActionButtonFill } from '../../components/ActionButtons/ActionButtons';

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
  componentDidMount() {
    this.props.store.auth.syncToken(true);
  }

  beforeUpload = () => {
    console.log('starting upload');
    return (Object.keys(this.props.data).length !== 0);
  }

  onStart = (file) => {
    console.log('onStart', file, file.name);
  }

  onSuccess = (ret) => {
    console.log('onSuccess', ret);
  }

  onError = (err) => {
    console.log('onError', err);
  }

  // onProgress({ percent }, file) {
  //   console.log('onProgress', `${percent}%`, file.name);
  // }

  render() {
    return (
      <div className='upload-widget'>
        <ProgressBar progress={30} />
        <Upload
          accept='.json, .geojson'
          multiple={false}
          name='territory'
          style={{ width: '10rem', textAlign: 'right' }}
          data={this.props.data}
          headers={this.props.store.auth.headers}
          action='/api/spacetime-volumes/'
          beforeUpload={this.beforeUpload}
          onStart={this.onStart}
          onSuccess={this.onSuccess}
          onError={this.onError}
        >
          <ActionButtonFill
            click={() => null}
            text=''
            icon='upload--blue'
            style={{ height: '4rem', width: '4rem', backgroundColor: 'transparent' }}
          />
        </Upload>
      </div>
    );
  }
}

export { ProgressBar };

export default UploadWidget;
