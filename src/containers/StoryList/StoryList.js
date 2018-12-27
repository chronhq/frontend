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
    return this.props.store.search.narratives.entities;
  }

  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  handleStorySelection(url) {
    this.props.store.courseSelection.cleanup();
    const course = this.props.store.courseSelection.find(url);
    this.props.store.courseSelection.select(course.id, course.url);
    this.props.history.push(`/${url}`);
    this.props.changeUi();
  }

  render() {
    return (
      <div className='dashboard-content'>
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
