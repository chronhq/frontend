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

import AdminTESearchCard from './AdminTESearchCard';

@inject('store')
@observer
class AdminTESelected extends React.Component {
  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get visible() {
    return (this.form.data.new || this.form.data.te);
  }

  @computed get data() {
    return this.form.data.new
      ? this.form.data.data
      : undefined;
  }

  @computed get te() {
    return this.form.data.te || 0;
  }

  render() {
    // {this.form.data.te && <AdminTESearchCard te={this.form.data.te} selected />}
    return this.visible
      ? (
        <AdminTESearchCard te={this.te} data={this.data} selected />
      )
      : null;
  }
}

export default AdminTESelected;
