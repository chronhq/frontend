import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InventionsFeed from './InventionsFeed';
import PersonsFeed from './PersonsFeed';
import ExportFromFeed from './ExportFromFeed';
import { selectLocation } from '../../reducers/status';

import './Feed.less';

export function exportFromFeed(id, format, selected) {
  return {
    type: 'FEED_EXPORT',
    id,
    format,
    selected,
  };
}

class Feed extends Component {

  state = {
    selected: { inventions: {}, geo_events: {}, persons: {} },
  }

  handleChange = (type, data) => {
    console.log('have new data in handle change', data);
    const selected = {
      ...this.state.selected,
      [type]: { ...this.state.selected[type], ...data }
    };
    this.setState({ selected });
  }

  handleHover = (type, factId) => {
    this.props.selectLocation(factId);
  }

  handleDownload = (id, type) => {
    this.props.exportFromFeed(id, type, this.state.selected);
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
        <ExportFromFeed cb={this.handleDownload} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventions: state.facts,
    currentInventions: state.timeline.facts.current,
    personsFacts: state.timeline.personsFacts.current,
    persons: state.persons
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectLocation: bindActionCreators(selectLocation, dispatch),
    exportFromFeed: bindActionCreators(exportFromFeed, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
