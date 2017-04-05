import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RotatingLogo from '../components/RotatingLogo';
import { askBackend } from '../reducers/actions';
import { markItReady } from '../reducers/status';
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
    this.props.askBackend('BORDERS_TIMELINE');
    this.props.askBackend('LOCATIONS');
    this.props.askBackend('TERRAIN');
    this.props.askBackend('PROPERTIES');
    this.props.askBackend('PROPERTIES_ADMIN');
    this.props.askBackend('PROPERTIES_TYPE');
    this.props.askBackend('FACTS');
    this.props.askBackend('PERSONS');
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
      persons: getLoadedStatus('Перечень лиц', state.timeline.persons)
    },
    data: {
      locations: getLoadedStatus('География мест', state.locations),
      facts: getLoadedStatus('География фактов', state.facts),
      borders: getLoadedStatus('Политические границы', state.borders),
      persons: getLoadedStatus('Информация о людях', state.persons),
      terrain: getLoadedStatus('Физическая карта мира', state.terrain)
    }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    askBackend: bindActionCreators(askBackend, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
