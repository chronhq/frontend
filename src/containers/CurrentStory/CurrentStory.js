import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

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
    console.log('id on render', this.props.store.courseSelection.courseId);
    return (
      <div className='currentstory'>
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

export default CurrentStory;
