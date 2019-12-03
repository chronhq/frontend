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

import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import TwoActions from '../../components/TwoActions/TwoActions';
import CalendarWidget from '../../components/ActionButtons/CalendarWidget';
import UploadWidget from '../../components/ActionButtons/UploadWidget';
import ActionButton from '../../components/ActionButtons/ActionButtons';

@inject('store')
@observer
class DummyScreen extends React.Component {
  render() {
    return (
      <AdminWrapper title='Under Construction' position='middle'>
        <CalendarWidget save={(d) => console.log('Calendar Save Date', d)} />
        <UploadWidget />
        <TwoActions>
          <ActionButton
            text='Back'
            click={() => this.props.store.admin.nextScreen('panel')}
          />
          <></>
        </TwoActions>
      </AdminWrapper>
    );
  }
}

export default DummyScreen;
