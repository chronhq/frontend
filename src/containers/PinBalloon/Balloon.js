import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import { PersonFact, Invention, GeoEvent } from './Messages';

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

  @computed get opacity() {
    return (this.pin === null || typeof this.pin === 'undefined')
      ? 0
      : 1;
  }

  @computed get style() {
    return {
      opacity: this.opacity,
      top: `${this.props.store.pins.pageY}px`,
      left: `${this.props.store.pins.pageX}px`,
    };
  }

  @computed get news() {
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
              fact={pin.invention}
              persons={this.persons}
              key={`balloon_inv_${pin.invention.id}`}
            />);
        default:
          return (
            <PersonFact
              person={pin.person}
              key={`balloon_person_${pin.type}_${pin.person.id}`}
            />);
      }
    });
  }

  render() {
    return (
      <div style={this.style} className='balloonNews'>
        {this.news}
      </div>
    );
  }
}
