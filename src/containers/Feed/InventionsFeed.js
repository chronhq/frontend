import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const showDescription = (fact) => {
  if (typeof fact.description === 'string') {
    return fact.description.replace(/\u00a0/g, ' ');
  }
  console.error('Missing fact description', fact);
  return 'Missing fact description';
};

export const getInventors = (persons, inventors) => inventors.reduce((prev, p) =>
  (typeof persons[p] === 'undefined'
    ? prev
    : [...prev, persons[p].nameRus]), []);

export const Invention = ({ fact, persons }) => (
  <div key={`in_${fact.id}`}>
    <div>
      <h5 className='factHeader'>{fact.nameRus}</h5>
      <h5 className='factDate'> {fact.inventDate} </h5>
    </div>
    <br />
    <div className='factDescription'>
      {showDescription(fact)}
    </div>
    <p className='factAuthor'>
      <i>{getInventors(persons, fact.inventor).join(', ')}
      </i>
    </p>
  </div>
);

@inject('store')
@observer
export default class InventionsFeed extends React.Component {
  @computed get persons() {
    return this.props.store.data.Persons.data;
  }

  @computed get inventions() {
    return this.props.store.data.Inventions.data;
  }

  @computed get selected() {
    return this.props.store.feed.inventions;
  }

  @computed get current() {
    return this.props.store.prepared.inventions.current;
  }

  @action select(v) {
    this.props.store.feed.inventions[v] = !this.selected[v];
  }

  @action selectLocation(inv) {
    const loc = this.inventions[inv].inventPlace;
    if (loc !== 0) {
      this.props.store.clickInfo.selectLocation(loc);
    } else {
      console.error(
        'Unknown place of invention',
        this.inventions[inv].id,
        this.inventions[inv].nameEng
      );
    }
  }

  @action closeWidget() {
    return this.props.store.clickInfo.closeWidget();
  }

  render() {
    return (
      <div className='InventionsFeed'>{this.current.map(invId => (
        <div
          key={`div_inv_${invId}`}
          onMouseEnter={() => this.selectLocation(invId)}
          onMouseLeave={() => this.closeWidget()}
          onClick={() => { this.select(invId); return false; }}
          className={this.selected[invId] === true
            ? 'selectedFact' : 'regularFact'}
        >
          <Invention fact={this.inventions[invId]} persons={this.persons} />
        </div>))}
      </div>
    );
  }
}
