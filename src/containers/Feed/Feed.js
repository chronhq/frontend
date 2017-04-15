import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InventionsFeed from './InventionsFeed';
import PersonsFeed from './PersonsFeed';
import GeoEventsFeed from './GeoEventsFeed';
import ExportFromFeed from './ExportFromFeed';
import { selectLocation } from '../../reducers/status';

import './Feed.less';

export function exportFromFeed(filename, format, selected) {
  return {
    type: 'FEED_EXPORT',
    filename,
    format,
    selected,
  };
}

class Feed extends Component {

  state = {
    selected: { inventions: {}, geoEvents: {}, persons: {} },
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

  handleDownload = (filename, type) => {
    this.props.exportFromFeed(filename, type, this.state.selected);
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
        <hr />
        <GeoEventsFeed
          geoEvents={this.props.geoEvents}
          current={this.props.currentGeoEvents}
          selected={this.state.selected.geoEvents}
          hoverCb={data => this.handleHover('geoEvents', data)}
          changeCb={data => this.handleChange('geoEvents', data)}
        />
        <hr />
        <InventionsFeed
          persons={this.props.persons}
          inventions={this.props.inventions}
          current={this.props.currentInventions}
          selected={this.state.selected.inventions}
          hoverCb={data => this.handleHover('inventions', data)}
          changeCb={data => this.handleChange('inventions', data)}
        />
        <hr />
        <ExportFromFeed cb={this.handleDownload} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventions: state.facts,
    currentInventions: state.timeline.facts.current,
    geoEvents: state.geoEvents,
    currentGeoEvents: state.timeline.geoEvents.current,
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
