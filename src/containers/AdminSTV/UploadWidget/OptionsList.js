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
import { ActionButtonFillText } from '../../../components/ActionButtons/ActionButtons';
import AdminTESearchBar from '../../../components/InputText/AdminTESearchBar';

@observer
class OptionsList extends React.Component {
  removeFromList = (idx) => {
    const res = [
      ...this.props.options.slice(0, idx),
      ...this.props.options.slice(idx + 1)
    ];
    this.props.selectOptions(res);
  }

  addToList = (item) => {
    this.props.selectOptions([...this.props.options, item]);
  }

  render() {
    // to support file list
    const getName = (o) => o.name || o;
    return (
      <div>
        {this.props.add ? (
          <AdminTESearchBar
            clean
            iconLabel='Add'
            icon='add--light'
            search={this.addToList}
            style={{ gridTemplateColumns: 'auto auto' }}
          />
        ) : null}
        {this.props.options.map((f, idx) => (
          <ActionButtonFillText
            className='admin-stv-card-main__font'
            key={`options_${encodeURI(getName(f))}`}
            text={getName(f)}
            style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}
            click={() => this.removeFromList(idx)}
            icon='delete--blue'
            size='1.25rem'
          />
        ))}
      </div>
    );
  }
}

export default OptionsList;
