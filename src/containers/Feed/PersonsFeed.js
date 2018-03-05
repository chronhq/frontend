import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const PersonFact = ({ person, fact }) => (
  <div
    // className='factStillInFuture'
    key={`pf_${fact.id}`}
  >
    <div className='factTest'>
      <h5 className='factHeader'> {person.nameRus} </h5>
      <h5 className='factDate'>
        {person.birthDate ? person.birthDate : '????'} <br /> {person.deathDate ? person.deathDate : '????'}
      </h5>
    </div>
  </div>
);

@inject('store')
@observer
export default class PersonFeed extends React.Component {
  @computed get current() {
    return this.props.store.prepared.persons.current;
  }

  @computed get persons() {
    return this.props.store.data.Persons.data;
  }

  @computed get selected() {
    return this.props.store.feed.persons;
  }

  @action select(v) {
    this.props.store.feed.persons[v] = !this.selected[v];
  }
  @action selectLocation(person, type) {
    const typePlace = `${type}Place`;
    const loc = person[typePlace];
    if (loc !== 0) {
      this.props.store.clickInfo.selectLocation(loc);
    } else {
      console.error('Unknown location for person', person.id, person.nameEng, type);
    }
  }

  @action closeWidget() {
    return this.props.store.clickInfo.closeWidget();
  }

  render() {
    return (
      <div className='PersonsFeed'>
        {['birth', 'death'].map(type => (
          <div key={`persons_feed_${type}`}>
            <h5 className='personType'>
              {type === 'birth' ? 'Родились' : 'Умерли'}
            </h5>
            <ul>
              {this.current[type].map(perFact => (
                <div
                  key={`div_per_${perFact.id}`}
                  onMouseEnter={() => this.selectLocation(this.persons[perFact.person], type)}
                  onMouseLeave={() => this.closeWidget()}
                  onClick={() => { this.select(perFact.id); return false; }}
                  className={this.selected[perFact.id] === true
                    ? 'selectedFact' : 'regularFact'}
                >
                  <PersonFact person={this.persons[perFact.person]} fact={perFact} />
                </div>))}
            </ul>
          </div>))}
      </div>
    );
  }
}
