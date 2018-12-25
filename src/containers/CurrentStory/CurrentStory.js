import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';

import RateBar from '../RateBar/RateBar';
import './CurrentStory.less';

@inject('store')
@observer
class CurrentStory extends Component {
  @computed get courses() {
    return this.props.store.data.Courses.data;
  }

  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  render() {
    return (
      <div className='currentstory'>
        {this.props.isStorySelected
          && (
            <button
              type='button'
              onClick={() => this.props.changeUi()}
            >
              <i className='lnr lnr-chevron-left' aria-hidden='true' />
              Back
            </button>
          )}
        <h6>
          {(this.props.store.courseSelection.courseId
            || this.props.store.courseSelection.courseId === 0)
            ? this.courses[this.props.store.courseSelection.courseId].name[this.lng]
            : ''
          }
        </h6>
        <RateBar />
      </div>
    );
  }
}

CurrentStory.propTypes = {
  changeUi: PropTypes.func.isRequired,
  isStorySelected: PropTypes.bool.isRequired
};

export default CurrentStory;
