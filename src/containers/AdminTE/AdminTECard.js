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
import { computed, action } from 'mobx';
import julian from 'julian';

import './AdminTECard.less';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

import colors from '../../models/MVTStyles/colors';

const colorMarker = (color) => (
  [
    '<svg width="70px" height="150px" version="1.1" xmlns="http://www.w3.org/2000/svg">',
    `<path transform="scale(.26458)" d="m0 0v566.79l132.21-133.49 132.35 133.63v-566.93h-264.57z" fill="${color.replace('#', '%23')}"/>`,
    '</svg>'
  ].join('')
);

const DateFromJulian = ({ date = undefined }) => {
  if (date === undefined || date === null) return 'No Date';
  try {
    const d = julian.toDate(Number(date));
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()];
    return `${d.getUTCFullYear()} ${month} ${d.getUTCDate()}`;
  } catch (e) {
    console.error('Invalid date', date);
    console.error(e);
    return 'Failed';
  }
};


@inject('store')
@observer
class AdminTECard extends React.Component {
  @computed get style() {
    const color = Object.keys(colors).reduce((prev, cur) => (colors[cur] === Number(this.te.color) ? cur : prev), '#7F7F7F');
    const img = colorMarker(color);
    return ({
      backgroundSize: '3%',
      backgroundPosition: '8px 0',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url('data:image/svg+xml;utf8,${img}')`
    });
  }

  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get data() {
    return this.form.data.form || {};
  }

  @computed get teData() {
    return this.props.store.data.territorialEntities.data[this.props.te] || {};
  }

  @computed get te() {
    return {
      ...this.props.data,
      ...this.teData,
    };
  }

  @computed get label() {
    return this.te.id
      ? `(${this.te.id}) ${this.te.label}`
      : this.te.label;
  }

  @action changeColor(c) {
    this.data.color = c;
  }

  render() {
    return (
      <div
        className={`te-search-card ${this.props.selected ? 'te-search-card--selected' : ''}`}
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
        </div>
        <div className='te-search-card__stv'>
          {'Entities: '}
          {this.te.stv_count}
        </div>
        <div className='te-search-card__color'>
          Color:
          <ColorPicker
            selected={Number(this.te.color)}
            changeColor={(c) => this.changeColor(c)}
          />
        </div>
      </div>
    );
  }
}

AdminTECard.defaultProps = {
  te: 0,
  selected: false,
  select: () => true,
};

AdminTECard.propTypes = {
  te: PropTypes.number,
  select: PropTypes.func,
  selected: PropTypes.bool,
};

export default AdminTECard;
