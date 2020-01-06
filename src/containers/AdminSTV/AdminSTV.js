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
import { computed, observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';

import ActionButton, { CreateActionButton } from '../../components/ActionButtons/ActionButtons';
import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
// import STVEntity from './STVEntity';

import './AdminSTV.less';
import TwoActions from '../../components/TwoActions/TwoActions';
import AdminTECard from '../AdminTE/AdminTECard';

@inject('store')
@observer
class AdminSTV extends React.Component {
  @observable color = undefined;

  @computed get data() {
    return { color: this.color };
  }

  @computed get dirty() {
    return !Object.keys(this.data).every((c) => this.data[c] === undefined);
  }

  clean = () => {
    Object.keys(this.data).map((t) => this.change(t, undefined));
  }

  @action change = (t, v) => {
    this[t] = v;
  }


  render() {
    // const data = this.props.store.admin.stvs;
    return (
      <AdminWrapper>
        <AdminTECard te={this.props.params.entity} data={this.data} change={this.change} />
        {/* <div className='stv-entities'>
          {data.map((d) => (
            <STVEntity
              {...d}
              key={d.key}
            />
          ))}
        </div> */}
        <TwoActions>
          {this.dirty
            ? <ActionButton text='Cancel' icon='cancel' click={this.clean} />
            : <ActionButton text='Back' icon='cancel' click={() => this.props.history.push('/admin/te/')} />}
          <ActionButton text='Save' icon='save' click={() => null} />
        </TwoActions>
        <TwoActions>
          <></>
          <CreateActionButton text='Add' click={() => true} />
        </TwoActions>
      </AdminWrapper>
    );
  }
}

export default withRouter(AdminSTV);
