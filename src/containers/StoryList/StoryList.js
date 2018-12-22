import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { withRouter } from 'react-router-dom';

import StoryCard from '../StoryCard/StoryCard';
import './StoryList.less';

@inject('store')
@observer
class StoryList extends React.Component {
  @computed get courses() {
    return this.props.store.data.Courses.data;
  }

  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  handleStorySelection(url) {
    console.log('action', url);
    this.props.store.courseSelection.cleanup();
    const course = this.props.store.courseSelection.find(url);
    this.props.store.courseSelection.select(course.id, course.url);
    this.props.history.push(`/${url}`);
  }

  // selectCourse() {
  //   const course = this.props.store.courseSelection.find(this.props.story);
  //   if (course !== undefined) {
  //     this.props.store.courseSelection.select(course.id, course.url);
  //   } else {
  //     this.props.history.push('/404');
  //   }
  // }

  // validateCourses() {
  //   const errorPages = {
  //     404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
  //   };
  //   const error = toJS(this.props.store.data.Courses.status.error);
  //   if (error !== null && errorPages[toJS(error.status)] !== undefined) {
  //     this.props.history.push(`/${toJS(error.status)}`);
  //   }
  //   if (this.props.story !== 'CourseSelection') {
  //     this.selectCourse();
  //   }
  // }

  render() {
    console.log('courses', this.courses);
    return (
      <div className='storylist'>
        {Object.values(this.courses).map(story => (
          <StoryCard
            key={`card_${story.url}`}
            title={story.name[this.lng]}
            author={story.author[this.lng]}
            url={story.url}
            dates={[story.config.year.min, story.config.year.max]}
            cb={() => this.handleStorySelection(story.url)}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(StoryList);
