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
import PropTypes from 'prop-types';

import { observer, inject } from 'mobx-react';
import { computed, action, observable } from 'mobx';

import './AdminTECard.less';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import { ActionButtonFill } from '../../components/ActionButtons/ActionButtons';
import { DateFromJulian } from '../../components/DatePicker/DatePicker';


@inject('store')
@observer
class AdminTECard extends React.Component {
  @observable edit = false;

  @computed get style() {
    return `color-flag color-flag--${(this.te.color > 0 && this.te.color < 14) ? this.te.color : 0}`;
  }

  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get teData() {
    return this.props.store.data.territorialEntities.data[this.props.te] || {};
  }

  @computed get te() {
    const data = Object.keys(this.props.data)
      .reduce(((prev, cur) => (
        this.props.data[cur] === undefined
          ? prev
          : { ...prev, [cur]: this.props.data[cur] }
      )), {});
    return {
      ...this.teData,
      ...data,
    };
  }

  @computed get label() {
    return this.te.id
      ? `(${this.te.id}) ${this.te.label}`
      : this.te.label;
  }

  @action toggleEdit = () => {
    this.edit = !this.edit;
  }

  render() {
    return (
      <div
        className={`${this.style} te-search-card ${this.props.selected ? 'te-search-card--selected' : ''}`}
        onClick={this.props.select}
        onKeyPress={this.props.select}
        tabIndex={0}
        role='button'
      >
        <div className='te-search-card__label'>{this.label}</div>
        <div className='te-search-card__date--inception'>
          <DateFromJulian date={this.te.inception_date} />
        </div>
        <div className='te-search-card__date--dissolution'>
          <DateFromJulian date={this.te.dissolution_date} />
        </div>
        <div className='te-search-card__link'>
          <a
            className='admin-te-wikidata-link__font'
            href={`https://www.wikidata.org/wiki/Q${this.te.wikidata_id}`}
            target='_blank'
            rel="noopener noreferrer"
          >
            Q
            {this.te.wikidata_id}
          </a>
          {this.props.change && (
            <ActionButtonFill
              click={this.toggleEdit}
              text=''
              icon='edit--blue'
              style={{ height: '1.25rem', width: '1.25rem', backgroundColor: 'transparent' }}
            />
          )}
        </div>
        <div className='te-search-card__stv'>
          {'Entities: '}
          {this.te.stv_count}
        </div>
        {this.props.change && (
          <div className='te-search-card__color' style={{ visibility: this.edit ? 'inherit' : 'hidden' }}>
            Color:
            <ColorPicker
              selected={Number(this.te.color)}
              changeColor={(c) => this.props.change('color', c)}
            />
          </div>
        )}
      </div>
    );
  }
}

AdminTECard.defaultProps = {
  te: 0,
  change: undefined,
  data: {},
  selected: false,
  select: () => true,
};

AdminTECard.propTypes = {
  te: PropTypes.any,
  change: PropTypes.any,
  data: PropTypes.any,
  select: PropTypes.func,
  selected: PropTypes.bool,
};

export default AdminTECard;
