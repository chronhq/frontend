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
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import Button, { BUTTON_TYPE } from '../Button/Button';
import './AdminWrapper.less';

@inject('store')
@observer
class LogoutButton extends React.Component {
  @computed get auth() {
    return this.props.store.auth;
  }

  logout = () => {
    firebase.auth().signOut();
    // for disabled login
    this.auth.user = undefined;
  }

  render() {
    return !this.auth.isSignedIn ? null : (
      <Button onClick={this.logout} btnType={BUTTON_TYPE.GHOST}>
        Log out
      </Button>
    );
  }
}

export default LogoutButton;
