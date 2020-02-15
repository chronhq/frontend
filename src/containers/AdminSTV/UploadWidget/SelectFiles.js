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
import { observer } from 'mobx-react';
import { GiantActionButtonFillText } from '../../../components/ActionButtons/ActionButtons';

@observer
class SelectFiles extends React.Component {
  onChange = (e) => {
    const { files } = e.target;
    this.props.selectFiles(Array.from(files));
  }

  render() {
    return (
      <>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={this.onChange}
          accept={this.props.accept}
          multiple={this.props.multiple}
          ref={(r) => { this.ref = r; }}
        />
        <GiantActionButtonFillText
          click={() => this.ref.click()}
          icon='plus-circle--blue'
          text='Select File'
        />
      </>
    );
  }
}

export default SelectFiles;
