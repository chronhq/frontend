import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import { PersonFact, Invention, GeoEvent } from './Messages';
import CountryHover from './CountryHover';

import './Balloon.less';
@inject('store')
@observer
export default class Balloon extends React.Component {
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
    } else {
      if (this.props.store.pins.pageY < 0.7 * window.innerHeight) {
        classes.push('balloonTopLeft');
      } else {
        classes.push('balloonBottomLeft');
      }
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
    if (this.countryHover !== null) {
      return <CountryHover id={this.countryHover} />;
    }
    if (this.pin === null || typeof this.pin === 'undefined') return null;

    return this.pin.info.map((pin) => {
      switch (pin.type) {
        case 'geo': return (
          <GeoEvent
            fact={pin.geoEvent.data}
            key={`balloon_geo_${pin.geoEvent.id}`}
          />);

        case 'inv':
          return (
            <Invention
              fact={this.i18n.invention(pin.invention)}
              key={`balloon_inv_${pin.invention.id}`}
            />);
        default:
          return (
            <PersonFact
              person={this.i18n.person(pin.person, pin.type)}
              key={`balloon_person_${pin.type}_${pin.person.id}`}
            />);
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
