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

import Button, { BUTTON_TYPE, BUTTON_SIZE, BUTTON_COLOR } from '../../components/Button/Button';
import AdminWrapper from './AdminWrapper';

import { Create, Change, Sandbox } from './AdminIcons';


@inject('store')
@observer
class AdminPanel extends React.Component {
  @computed get auth() {
    return this.props.store.auth;
  }

  render() {
    return (
      <AdminWrapper title='User Panel'>
        <h4>
          {'Profile'}
        </h4>
        <Button
          btnType={BUTTON_TYPE.GHOST}
          // btnSize={BUTTON_SIZE.WIDE}
          bntColor={BUTTON_COLOR.TRANSP}
          onClick={() => true}
        >

          <span>
            <Create />
            {' '}
            {'Test'}
          </span>
        </Button>
      </AdminWrapper>
    );
  }
}

export default AdminPanel;
