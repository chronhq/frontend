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
    this.props.askBackend('LOCATIONS');
    this.props.askBackend('LOCATIONS_TIMELINE');
    this.props.askBackend('TERRAIN');
    this.props.askBackend('BORDERS');
    this.props.askBackend('BORDERS_TIMELINE');
    this.props.askBackend('FACTS');
    this.props.askBackend('FACTS_TIMELINE');
    this.props.askBackend('PERSONS');
    this.props.askBackend('PERSONS_TIMELINE');
    this.props.askBackend('PERSONS_FACTS');
  }
  componentWillReceiveProps(next) {
    const notLoaded = sumLoading(next.timeline) + sumLoading(next.data)
    // TODO Check for projected data
    if (notLoaded === 0) this.props.markItReady(true);
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
function mapStateToProps(state) {
  return {
    timeline: {
      locations: {
        name: 'Перечень мест',
        loaded: state.timeline.locations.loaded,
        loading: state.timeline.locations.loading || false,
        error: state.timeline.locations.error || false
      },
      facts: {
        name: 'Перечень фактов',
        loaded: state.timeline.facts.loaded,
        loading: state.timeline.facts.loading || false,
        error: state.timeline.facts.error || false
      },
      borders: {
        name: 'Перечень границ',
        loaded: state.timeline.borders.loaded,
        loading: state.timeline.borders.loading || false,
        error: state.timeline.borders.error || false
      },
      persons: {
        name: 'Перечень лиц',
        loaded: state.timeline.persons.loaded,
        loading: state.timeline.persons.loading || false,
        error: state.timeline.persons.error || false
      }
    },
    data: {
      locations: {
        name: 'География мест',
        loaded: state.locations.loaded,
        loading: state.locations.loading || false,
        error: state.locations.error || false
      },
      facts: {
        name: 'География фактов',
        loaded: state.facts.loaded,
        loading: state.facts.loading || false,
        error: state.facts.error || false
      },
      borders: {
        name: 'Политические границы',
        loaded: state.borders.loaded,
        loading: state.borders.loading || false,
        error: state.borders.error || false
      },
      persons: {
        name: 'Информация о людях',
        loaded: state.persons.loaded,
        loading: state.persons.loading || false,
        error: state.persons.error || false
      },
      terrain: {
        name: 'Физическая карта мира',
        loaded: state.terrain.loaded,
        loading: state.terrain.loading || false,
        error: state.terrain.error || false
      }
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
