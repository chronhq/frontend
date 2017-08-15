import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RotatingLogo from './RotatingLogo';
import { loadData } from '../../reducers/actions';
import { markItReady } from '../../reducers/actions';
import './LoadingScreen.less';

const getIcon = (e) => {
  if (e.loaded) {
    return 'fa-check';
  } else if (e.loading) {
    return 'fa-spinner';
  }
  return 'fa-times';
};
const sumLoading = obj =>
  Object.keys(obj).reduce((prev, curId) => prev + Number(!obj[curId].loaded), 0);

const LoadingListElement = ({ element }) => (
  <li><i className={`fa ${getIcon(element)}`} aria-hidden="true" />{element.name}</li>
);

class LoadingScreen extends Component {
  componentDidMount() {
    this.props.loadData([
      {
        resource: 'BORDERS_TIMELINE',
      },{
        resource: 'LOCATIONS',
        req: { key: 'places' }
      },{
        resource: 'TERRAIN',
      },{
        resource: 'PROPERTIES',
        req: { key: 'properties' }
      },{
        resource: 'PROPERTIES_ADMIN',
        req: { key: 'admin' }
      },{
        resource: 'PROPERTIES_TYPE',
        req: { key: 'type' }
      },{
        resource: 'EVENTS_GEO',
        req: { key: 'byId' }
      },{
        resource: 'FACTS',
      },{
        resource: 'PERSONS'
      }
    ]);
  }
  componentWillReceiveProps(next) {
    const notLoaded = sumLoading(next.timeline) + sumLoading(next.data);
    // TODO Check for projected data
    if (notLoaded === 0) {
      this.props.markItReady(true);
    }
  }
  render() {
    return (
      <div className='loadingPage'>
        <RotatingLogo className='logo' />
        <ul>
          {Object.keys(this.props.timeline).map(t =>
            <LoadingListElement
              key={`timeline_${t}`}
              element={this.props.timeline[t]}
            />)}
          {Object.keys(this.props.data).map(t =>
            <LoadingListElement
              key={`data_${t}`}
              element={this.props.data[t]}
            />)}
        </ul>
      </div>
    );
  }
}

const getLoadedStatus = (name, data) => ({
  name,
  loaded: data.loaded,
  loading: data.loading || false,
  error: data.error || false
});

function mapStateToProps(state) {
  return {
    timeline: {
      locations: getLoadedStatus('Перечень мест', state.timeline.locations),
      facts: getLoadedStatus('Перечень фактов', state.timeline.facts),
      borders: getLoadedStatus('Перечень границ', state.timeline.borders),
      personsFacts: getLoadedStatus('Годы жизни великих людей', state.timeline.personsFacts),
      personsAlive: getLoadedStatus('Годы жизни великих людей', state.timeline.personsAlive),
      geoEvents: getLoadedStatus('Годы жизни великих людей', state.timeline.geoEvents)
    },
    data: {
      locations: getLoadedStatus('География мест', state.data.locations),
      facts: getLoadedStatus('География фактов', state.data.facts),
      borders: getLoadedStatus('Политические границы', state.data.borders),
      geoEvents: getLoadedStatus('Описание изменений', state.data.geoEvents),
      persons: getLoadedStatus('Информация о людях', state.data.persons),
      terrain: getLoadedStatus('Физическая карта мира', state.data.terrain)
    }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadData: bindActionCreators(loadData, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
