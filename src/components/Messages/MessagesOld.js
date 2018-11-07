import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class GeoEvent extends React.Component {
  @computed get title() {
    return this.props.store.i18n.data.messages.GeoEventTitle;
  }

  render() {
    const { fact } = { ...this.props };
    return (
      <div className='factInner'>
        <p className='balloon-title'>
          {this.title}
        </p>
        <p className='factDescription'>
          {fact.description}
        </p>
        <p className='factDate'>
          {fact.date}
        </p>
      </div>
    );
  }
}

@inject('store')
@observer
class PersonFact extends React.Component {
  render() {
    const { person } = { ...this.props };
    return (
      <div key={person.key}>
        <p className='balloon-title'>
          {person.title}
        </p>
        <p className='factHeader'>
          {person.occasion}
        </p>
        <p className='factDate'>
          {person.birthDate}
          <br />
          {person.deathDate}
        </p>
        <p className='factDescription'>
          {person.location}
        </p>
      </div>
    );
  }
}

@inject('store')
@observer
class Invention extends React.Component {
  @computed get title() {
    return this.props.store.i18n.data.messages.InventionsTitle;
  }

  render() {
    const { fact } = { ...this.props };
    return (
      <div key={fact.key}>
        <p className='balloon-title'>
          {this.title}
        </p>
        <p className='factHeader'>
          {fact.name}
        </p>
        <p className='factDescription'>
          {fact.description}
        </p>
        <p className='factDate'>
          {fact.inventDate}
        </p>
        <p className='factAuthor'>
          <i>
            {fact.inventors}
          </i>
        </p>
      </div>
    );
  }
}

export {
  Invention,
  PersonFact,
  GeoEvent
};
