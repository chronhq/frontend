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
import React, { Suspense, lazy } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import LoadingLogo from '../../containers/LoadingLogo';

import './AdminInterface.less';
import Spinner from '../../components/Spinner/Spinner';
import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';

const AdminLoginGuard = lazy(() => import('./AdminLoginGuard'));

const AdminTE = lazy(() => import('../../containers/AdminTE/AdminTE'));
const AdminSTV = lazy(() => import('../../containers/AdminSTV/AdminSTV'));

@inject('store')
@observer
class AdminInterface extends React.Component {
  componentDidMount() {
    if (!this.loaded) {
      this.props.store.data.territorialEntities.get();
    }
  }

  @computed get loaded() {
    return this.props.store.data.territorialEntities.status.loaded;
  }

  get screen() {
    const { type, entity, sub } = this.props.params;
    if (type === 'te') {
      if (sub !== undefined) return AdminSTV;
      if (entity !== undefined) return AdminSTV;
      return AdminTE;
    }
    return AdminTE;
  }

  render() {
    const Screen = this.screen;
    return (
      <Suspense fallback={<LoadingLogo />}>
        <div className='float-container admin-block'>
          <AdminLoginGuard>
            {this.loaded
              ? <Screen params={this.props.params} />
              : <AdminWrapper><Spinner /></AdminWrapper>}
          </AdminLoginGuard>
        </div>
      </Suspense>
    );
  }
}

export default AdminInterface;
