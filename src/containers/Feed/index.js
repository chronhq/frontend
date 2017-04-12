import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InventionsFeed from './InventionsFeed';
import PersonsFeed from './PersonsFeed';
import ExportFromFeed from './ExportFromFeed';
import { selectLocation } from '../../reducers/status';

import './Feed.less';

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
        <ExportFromFeed exported={this.state.exported} />
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
