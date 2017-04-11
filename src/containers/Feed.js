import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Fact from '../components/Fact';
import { selectLocation } from '../reducers/status';

import './Feed.less';

const DownloadButton = ({ data, filename, label }) => {
  const blob = new Blob([data], { type: 'application/msword' });
  console.log('Blob is ready for data', data);
  const fileData = window.URL.createObjectURL(blob);
  return (
    <div className="btn-group">
      <a href={fileData} rel='noopener noreferer' target='_blank' download={filename} className="btn  btn-default btn-sm">
      {label}
      </a>
    </div>
  );
};

const InventionsFeed = ({ persons, inventions, current, selected, hoverCb, changeCb }) => (
  <div className='InventionsFeed'>{current.map(year => year.map(invId =>
    <div
      key={`div_inv_${invId}`}
      onMouseEnter={() => hoverCb(invId)}
      onMouseLeave={() => hoverCb(null)}
      onClick={() => changeCb({ [invId]: !selected[invId] })}
      className={selected[invId] === true
        ? 'selectedFact' : 'regularFact'}
    >
      <Fact fact={inventions.byId[invId]} persons={persons.byId} />
    </div>
  ))}
  </div>
);
const PersonFact = ({ person, fact }) => (
  <div
    className='factStillInFuture'
    key={`pf_${person.id}`}
  >
    <span>
    {fact.type === 'born'
      ? 'Родился'
      : 'Умер' } {person.name_rus}
    </span>
  </div>
);
const PersonsFeed = ({ persons, current, selected, hoverCb, changeCb }) => (
  <div className='PersonsFeed'>{current.map(perFact =>
    <div
      key={`div_per_${perFact.id}`}
      onMouseEnter={() => hoverCb(persons.byId[perFact.id].birth_place)}
      onMouseLeave={() => hoverCb(null)}
      onClick={() => changeCb({ [perFact.id]: !selected[perFact.id] })}
      className={selected[perFact.id] === true
        ? 'selectedFact' : 'regularFact'}
    >
      <PersonFact person={persons.byId[perFact.id]} fact={perFact} />
    </div>
  )}
  </div>
);
class Feed extends Component {

  state = {
    selected: { inventions: {}, geo_events: {}, persons: {} },
    exported: []
  }

  formatFactForExport = fact =>
`${fact.name_rus} ${fact.invention_date}
${fact.description}
`

  // formatFactForExport = fact => <Fact fact={fact} persons={this.props.persons.byId} />

  prepareForExport = selected =>
    Object.keys(selected).reduce((prev, stateId) => {
      if (selected[stateId] === true) {
        const factId = stateId;
        return [...prev, this.formatFactForExport(this.props.facts.byId[factId])];
      }
      return prev;
    }, [])

  handleChange = (type, data) => {
    console.log('have new data in handle change', data);
    const selected = {
      ...this.state.selected,
      [type]: { ...this.state.selected[type], ...data }
    };
    const exported = this.prepareForExport(selected);
    this.setState({ selected, exported });
  }
  handleHover = (type, factId) => {
    this.props.selectLocation(factId);
  }


  render() {
    return (
      <div className='feed'>
        <h3> Лента событий </h3>
        <PersonsFeed
          persons={this.props.persons}
          current={this.props.personsFacts}
          selected={this.state.selected.persons}
          hoverCb={data => this.handleHover('persons', data)}
          changeCb={data => this.handleChange('persons', data)}
        />
        <InventionsFeed
          persons={this.props.persons}
          inventions={this.props.inventions}
          current={this.props.currentInventions}
          selected={this.state.selected.inventions}
          hoverCb={data => this.handleHover('inventions', data)}
          changeCb={data => this.handleChange('inventions', data)}
        />
        <DownloadButton
          filename="facts.doc"
          label="Экспорт в doc"
          data={this.state.exported}
        />
        <DownloadButton
          filename="facts.pdf"
          label="Экспорт в pdf"
          data={this.state.exported}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventions: state.facts,
    currentInventions: state.timeline.facts.current,
    // personsAlive: state.timeline.personsAlive.current,
    personsFacts: state.timeline.personsFacts.current,
    persons: state.persons
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectLocation: bindActionCreators(selectLocation, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
