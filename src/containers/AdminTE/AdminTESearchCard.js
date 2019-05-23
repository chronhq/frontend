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
import { computed } from 'mobx';

import DateRangeWidget from '../../components/DatePicker/DateRangeWidget';

import './AdminTESearchCard.less';


@inject('store')
@observer
class AdminTESearchCard extends React.Component {
  @computed get tes() {
    return this.props.store.data.territorialEntities.data;
  }

  @computed get te() {
    return {
      ...this.tes[this.props.te],
      label: 'TE Label',
      inception: new Date('2000-01-01'),
      dissolution: new Date('2000-01-02'),
      stv: Math.round(Math.random() * 20),
    };
  }

  @computed get label() {
    return `(${this.te.id}) ${this.te.label}`;
  }

  render() {
    return (
      <div
        className={`te-search-card ${this.props.selected ? 'te-search-card--selected' : ''}`}
        onClick={this.props.select}
        onKeyPress={this.props.select}
        tabIndex={0}
        role='button'
      >
        <div className='te-search-card__label'>{this.label}</div>
        <DateRangeWidget start={this.te.inception} end={this.te.dissolution} />
        <div className='te-search-card__info'>
          <span>Wikidata ID:</span>
          <a
            href={`https://www.wikidata.org/wiki/Q${this.te.wikidata_id}`}
            target='_blank'
            rel="noopener noreferrer"
          >
            {this.te.wikidata_id}
          </a>
          <span>Geometry entities:</span>
          <span>{this.te.stv}</span>
        </div>
      </div>
    );
  }
}

AdminTESearchCard.defaultProps = {
  selected: false,
  select: () => true,
};

AdminTESearchCard.propTypes = {
  te: PropTypes.number.isRequired,
  select: PropTypes.func,
  selected: PropTypes.bool,
};

export default AdminTESearchCard;
