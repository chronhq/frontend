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
import { inject, observer } from 'mobx-react';

import TwoActions from '../../components/TwoActions/TwoActions';
import CalendarWidget from '../../components/ActionButtons/CalendarWidget';
import UploadWidget from '../../components/ActionButtons/UploadWidget';
import ActionButton, {
  LabelActionButton, CreateActionButton
} from '../../components/ActionButtons/ActionButtons';

const References = ({ edit }) => (
  <>
    <p>
      {'References'}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
      <i>http link a</i>
      <i>http link b</i>
      <i>more info</i>
      {edit && <CreateActionButton text='Add' click={() => null} />}
    </div>
  </>
);

const DateSelector = () => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
    <CalendarWidget text='Start Date' save={d => console.log('Calendar Save Date', d)} />
    <CalendarWidget text='End Date' save={d => console.log('Calendar Save Date', d)} />
  </div>
);

const Problems = () => (
  <>
    <p>
      {'Problems'}
    </p>
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ActionButton text='C ∈ A' click={() => null} />
        {' || '}
        <ActionButton text='C ∈ B' click={() => null} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ActionButton text='D ∈ A' click={() => null} />
        {' || '}
        <ActionButton text='D ∈ E' click={() => null} />
      </div>
    </div>
  </>
);

@inject('store')
@observer
class EditSTV extends React.Component {
  render() {
    return this.props.edit
      ? (
        <div className='adminContent'>
          <DateSelector />
          <References edit={this.props.edit} />
          <UploadWidget />
          <LabelActionButton text='Set visual center' click={() => null} />
          <Problems />
          <TwoActions
            left='Cancel'
            leftClick={() => null}
            right='Save'
            rightClick={() => null}
          />
        </div>
      )
      : (
        <div className='adminContent'>
          <References edit={this.props.edit} />
          <TwoActions
            right='Edit'
            rightClick={() => null}
          />
        </div>
      );
  }
}

export default EditSTV;
