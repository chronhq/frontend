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

import {
  Sources,
  PersonFact,
  Battle,
  Document
} from '../../components/Messages';
import CountryHover from '../../components/Messages/CountryHover';


@inject('store')
@observer
class BalloonContent extends React.Component {
  @computed get i18n() {
    return this.props.store.i18n.data.messages;
  }

  @computed get balloon() {
    return this.props.store.balloon;
  }

  @computed get data() {
    return this.balloon.selected;
  }

  @computed get news() {
    if (this.data === null || this.data === undefined) return [];
    return this.data.info.map((pin) => {
      switch (pin.type) {
        case 'countryHover':
          return {
            id: 'countryHoverBaloon',
            message: <CountryHover id={this.data.info[0].data.id} data={this.data.info[0].data} />,
            sources: <Sources
              id={this.data.info[0].data.wikidata_id}
              data={this.data.info[0].data}
              type={this.data.info[0].type}
            />
          };
        case 'death':
        case 'birth':
        // actor from wikidata
          return {
            id: `personHoverBalloon_${pin[pin.type].id}`,
            message: (
              <PersonFact
                person={pin[pin.type]}
                type={pin.type === 'death'
                  ? this.i18n.personDeath
                  : this.i18n.personBirth
                }
                event={pin[pin.type][[pin.type]] || {}}
                key={`balloon_person_${pin.type}_${pin[pin.type].id}`}
              />
            ),
            sources: <Sources id={pin[pin.type].id} type={pin.type} />
          };
        case 'battle':
          return {
            id: `battleHoverBalloon_${pin.battle.id}`,
            message: (
              <Battle
                i18n={this.i18n}
                fact={pin.battle}
                key={`balloon_battle_${pin.type}_${pin.battle.id}`}
              />
            ),
            sources: <Sources id={pin.battle.id} type={pin.type} />
          };
        case 'document':
          return {
            id: `documentHoverBalloon_${pin.document.id}`,
            message: (
              <Document
                fact={pin.document}
                key={`balloon_document_${pin.type}_${pin.document.id}`}
              />
            ),
            sources: <Sources id={pin.document.id} type={pin.type} />
          };
        default:
          return { message: () => '', sources: () => '', id: 'defaultBalloonId' };
      }
    });
  }

  render() {
    const news = 'balloonNews balloonMain';
    const sources = 'balloonNews balloonSources';
    return (
      <div className='balloonNewsContainer'>
        {this.news.map(n => (
          <div key={`news_${n.id}`} className='balloonNewsRow'>
            <div className={news}>{n.message}</div>
            {this.balloon.pinned && (<div className={sources}>{n.sources}</div>)}
          </div>
        ))}
      </div>
    );
  }
}

export default BalloonContent;
