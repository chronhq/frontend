import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import './StoryCard.less';

const StoryCardInfo = ({ hover, story }) => (
  <div className={`story-card-info ${hover ? '' : 'story-card-info__hidden'}`}>
    <div className='story-card--author'>
      <b>
        Author
      </b>
      <p>
        {story.author}
      </p>
    </div>
    <div className='story-card--author'>
      <b>
        Description
      </b>
      <p>
        {story.description}
      </p>
    </div>
  </div>
);

const StoryCardStatus = () => (
  <div className='story-card-status'>
    <div>
      {'XX'}
      {' '}
      {'cards'}
    </div>
    <div>
      {'0'}
      {' '}
      {'votes'}
    </div>
  </div>
);
// TODO i18n for author
@observer
class StoryCard extends React.Component {
  @observable hover = false;

  @action setHover(h) {
    this.hover = h;
  }

  render() {
    const { story, handleStorySelection } = this.props;
    return (
      <div
        role='button'
        tabIndex={0}
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        className='story-card'
        onClick={() => handleStorySelection(story.url)}
        onKeyPress={() => handleStorySelection(story.url)}
      >
        <StoryCardInfo hover={this.hover} story={story} />
        <div>
          <div className='story-card--title'>
            <h5>
              {story.title}
            </h5>
          </div>
          <div className='story-card--dates'>
            {[story.start_year, story.end_year].join(' - ')}
          </div>
        </div>
        <StoryCardStatus />
      </div>
    );
  }
}

export default StoryCard;
