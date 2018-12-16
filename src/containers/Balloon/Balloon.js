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
  PersonFact, Invention, GeoEvent, Battle, Document
} from '../../components/Messages';
import CountryHover from '../../components/Messages/CountryHover';

import './Balloon.less';

@inject('store')
@observer
class Balloon extends React.Component {
  @computed get persons() {
    return this.props.store.data.Persons.data;
  }

  @computed get pin() {
    return this.props.store.pins.selected;
  }

  @computed get countryHover() {
    return this.props.store.pins.countryHover;
    // return null;
  }

  @computed get opacity() {
    if (this.countryHover === null) {
      return (this.pin === null || typeof this.pin === 'undefined')
        ? 0
        : 1;
    }
    return 1;
  }

  @computed get style() {
    return {
      opacity: this.opacity,
      top: `${this.props.store.pins.pageY}px`,
      left: `${this.props.store.pins.pageX}px`,
    };
  }

  @computed get classNames() {
    const classes = ['balloonNews'];
    if (this.props.store.pins.pageX > 0.5 * window.innerWidth) {
      if (this.props.store.pins.pageY < 0.7 * window.innerHeight) {
        classes.push('balloonTopRight');
      } else {
        classes.push('balloonBottomRight');
      }
    } else if (this.props.store.pins.pageY < 0.7 * window.innerHeight) {
      classes.push('balloonTopLeft');
    } else {
      classes.push('balloonBottomLeft');
    }

    // if (this.props.store.pins.pageY > 0.7*window.innerHeight) {
    //   classes.push('balloonBottom');
    // } else {
    //   classes.push('balloonTop');
    // }
    return classes;
  }

  @computed get i18n() {
    return this.props.store.i18n.messages;
  }

  @computed get news() {
    if (this.countryHover !== null && this.countryHover !== undefined) {
      return <CountryHover id={this.countryHover} />;
    }
    if (this.pin === null || typeof this.pin === 'undefined') return null;

    return this.pin.info.map((pin) => {
      switch (pin.type) {
        case 'geo': return (
          <GeoEvent
            fact={pin.geoEvent}
            key={`balloon_geo_${pin.geoEvent.id}`}
          />);

        case 'inv':
          return (
            <Invention
              fact={this.i18n.invention(pin.invention)}
              key={`balloon_inv_${pin.invention.id}`}
            />);
        case 'death':
        case 'birth':
        // actor from wikidata
          return (
            <PersonFact
              person={pin.person.wd === true
                ? pin.person
                : this.i18n.person(pin.person, pin.type)}
              key={`balloon_person_${pin.type}_${pin.person.id}`}
            />);
        case 'battle':
          return (
            <Battle
              fact={pin.battle}
              key={`balloon_battle_${pin.type}_${pin.battle.id}`}
            />);
        case 'document':
          return (
            <Document
              fact={pin.document}
              key={`balloon_battle_${pin.type}_${pin.document.id}`}
            />);
        default:
          return () => '';
      }
    });
  }

  render() {
    return (
      <div style={{ ...this.style }} className={this.classNames.join(' ')}>
        {this.news}
      </div>
    );
  }
}

export default Balloon;
