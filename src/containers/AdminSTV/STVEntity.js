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
import { computed } from 'mobx';

import SmoothCollapse from 'react-smooth-collapse';

import DateRangeWidget from '../../components/DateRangeWidget';

import { ChangeActionButton } from '../../components/ActionButtons/ActionButtons';
import STVEntityEdit from './STVEntityEdit';

@inject('store')
@observer
class STVEntity extends React.Component {
  @computed get form() {
    return this.props.store.admin.forms.stv;
  }

  @computed get active() {
    return this.form.selected === this.props.id;
  }

  @computed get edit() {
    return this.active && this.form.edit;
  }

  click = (edit = false) => {
    this.form.select(this.props.id, edit);
  }

  render() {
    const { start, end, status } = this.props;
    return (
      <div className='stv-entities-container-row'>
        <div
          className='stv-entities-container-row--info'
          onClick={() => this.click()}
          onKeyDown={() => this.click()}
          role='button'
          tabIndex={0}
        >
          <span className={`lnr lnr-${status ? 'checkmark' : 'question'}-circle`} />
          <DateRangeWidget start={start} end={end} />
          <ChangeActionButton click={() => this.click(true)} text='' />
        </div>
        <SmoothCollapse expanded={this.active}>
          <STVEntityEdit edit={this.edit} {...this.props} />
        </SmoothCollapse>
      </div>
    );
  }
}

export default STVEntity;
