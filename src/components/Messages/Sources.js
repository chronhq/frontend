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

import ClickPositionInfo from './ClickPositionInfo';

const parseLink = (link) => {
  const tmp = link.replace(/https?:\/\//, '').replace(/\?.*/, '').replace(/\/$/, '');
  const file = tmp.replace(/.*\//, '');
  const domain = tmp.replace(/\/.*/, '').split('.').slice(-2).join('.');
  const res = file.match(domain)
    ? domain
    : `${domain} ${file}`;
  return {
    domain,
    file,
    full: res,
    res: res.substring(0, 30),
  };
};

const linkKey = (name, l, id) => (`src_${name}_${l.length}_${id}`);

const SourceInfo = ({ name, data = [], metricHit }) => (
  data.length > 0 ? (
    <div className='sourcesInfo'>
      <div className='message-text--body'>
        {name}
        {': '}
      </div>
      {data.map((d, id) => (
        <a
          key={linkKey(name, d, id)}
          className='message-text--light message-fact__source-list'
          href={d}
          onClick={() => {
            metricHit('goto_wikidata');
            return true;
          }}
          target='_blank'
          rel='noopener noreferrer'
        >
          {parseLink(d).res}
        </a>
      ))}
    </div>
  ) : null
);

@inject('store')
@observer
class Sources extends React.Component {
  @computed get messages() {
    return this.props.store.i18n.data.sourcesBalloon;
  }

  @computed get item() {
    const wId = this.props.id;
    const sources = this.props.type === 'countryHover'
      ? JSON.parse(this.props.data.references)
      : undefined;

    if (this.props.store.wikidata.cache[wId] !== undefined) {
      return {
        dataOrigin: this.props.store.wikidata.cache[wId].dataOrigin,
        sources,
      };
    }
    return {};
  }

  render() {
    const { metricHit } = this.props.store.analytics;
    return (
      <div>
        <SourceInfo name={this.messages.origin} data={this.item.dataOrigin} metricHit={metricHit} />
        <SourceInfo name={this.messages.sources} data={this.item.sources} metricHit={metricHit} />
        {this.props.type === 'countryHover' && <ClickPositionInfo />}
      </div>
    );
  }
}

export default Sources;
