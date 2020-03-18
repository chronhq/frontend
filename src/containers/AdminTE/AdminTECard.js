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
import { DateFromJulian } from '../../components/DateInput/DatePicker';


@inject('store')
@observer
class AdminTECard extends React.Component {
  @observable edit = false;

  toggleEdit = action(() => {
    this.edit = !this.edit;
  })

  @computed get teColor() {
    const { data } = this.props.store.data.mapcolorscheme;
    if (this.te.color !== undefined && data[this.te.color] !== undefined) {
      return data[this.te.color].color;
    }
    console.log('Fallback', this.te.color, this.te);
    return '#7F7F7F';
  }

  @computed get style() {
    const img = [
      '%3Csvg width="70px" height="150px" version="1.1" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath',
      'transform="scale(.26458)" d="m0 0v566.79l132.21-133.49 132.35 133.63v-566.93h-264.57z"',
      `fill="${this.teColor.replace('#', '%23')}"/%3E%3C/svg%3E`].join(' ');
    return {
      backgroundImage: `url('data:image/svg+xml;utf-8,${(img)}')`,
    };
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

  render() {
    return (
      <div
        className={`admin-te-card-main__font color-flag te-search-card ${this.props.selected ? 'te-search-card--selected' : ''}`}
        style={this.style}
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
        <div className='admin-te-card-light__font te-search-card__stv'>
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
