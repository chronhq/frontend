/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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

import './Balloon.less';

@inject('store')
@observer
class Balloon extends React.Component {
  @computed get pin() {
    return this.props.store.balloon.selected;
  }

  @computed get pinned() {
    return this.props.store.balloon.pinned;
  }

  @computed get countryHover() {
    return this.props.store.balloon.countryHover;
  }

  @computed get opacity() {
    if (this.countryHover === false) {
      return (this.pin === null || this.pin === undefined || this.pin.info.length === 0)
        ? 0 : 1;
    }
    return 1;
  }


  @computed get style() {
    return {
      opacity: this.opacity,
      visibility: this.opacity ? 'visible' : 'hidden',
      top: `${this.props.store.balloon.pageY}px`,
      left: `${this.props.store.balloon.pageX}px`,
    };
  }

  @computed get positionClassName() {
    if (this.props.store.balloon.pageX > 0.5 * window.innerWidth) {
      if (this.props.store.balloon.pageY < 0.7 * window.innerHeight) {
        return 'balloonTopRight';
      }
      return 'balloonBottomRight';
    } if (this.props.store.balloon.pageY < 0.7 * window.innerHeight) {
      return 'balloonTopLeft';
    }
    return 'balloonBottomLeft';
  }

  @computed get i18n() {
    return this.props.store.i18n.messages;
  }

  @computed get news() {
    if (this.pin === null || this.pin === undefined) return [];
    return this.pin.info.map((pin) => {
      switch (pin.type) {
        case 'countryHover':
          return {
            id: 'countryHoverBaloon',
            message: <CountryHover id={this.pin.info[0].data} />,
            sources: <Sources id={this.pin.info[0].data} type={this.pin.info[0].type} />
          };
        case 'death':
        case 'birth':
        // actor from wikidata
          return {
            id: `personHoverBalloon_${pin.person.id}`,
            message: (
              <PersonFact
                person={pin.person}
                key={`balloon_person_${pin.type}_${pin.person.id}`}
              />
            ),
            sources: () => ''
          };
        case 'battle':
          return {
            id: `battleHoverBalloon_${pin.battle.id}`,
            message: (
              <Battle
                fact={pin.battle}
                key={`balloon_battle_${pin.type}_${pin.battle.id}`}
              />
            ),
            sources: () => ''
          };
        case 'document':
          return {
            id: `documentHoverBalloon_${pin.document.id}`,
            message: (
              <Document
                fact={pin.document}
                key={`balloon_battle_${pin.type}_${pin.document.id}`}
              />
            ),
            sources: () => ''
          };
        default:
          return { message: () => '', sources: () => '', id: 'defaultBalloonId' };
      }
    });
  }

  render() {
    const container = `balloonNewsContainer ${this.positionClassName}`;
    const news = 'balloonNews balloonMain';
    const sources = 'balloonNews balloonSources';
    return (
      <div style={{ ...this.style }} className={container}>
        <div className={news}>
          {this.news.map(n => (<div key={`news_${n.id}`}>{n.message}</div>))}
        </div>
        {this.pinned && (
          <div className={sources}>
            {this.news.map(n => (<div key={`sources_${n.id}`}>{n.sources}</div>))}
          </div>
        )}
      </div>
    );
  }
}

export default Balloon;
