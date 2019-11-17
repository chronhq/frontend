import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import './StoryCard.less';

const StoryCardInfo = ({
  hover, story, standalone, style = {}
}) => (
  <div
    className={[
      'float-container',
      standalone ? '' : 'story-card-info',
      hover ? '' : 'story-card-info__hidden'].join(' ')}
    style={style}
  >
    <div className='story-card__author'>
      <b>
        Author
      </b>
      <p>
        {story.author}
      </p>
    </div>
    <div className='story-card__author'>
      <b>
        Description
      </b>
      <p>
        {story.description}
      </p>
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
        <div className='story-card-grid decoration-fire'>
          <div className='text__narrative--header'>
            {story.title}
          </div>
          <div className='text__narrative--header story-card__title--dates'>
            {'in '}
            {[story.start_year, story.end_year].join(' - ')}
          </div>
          <div className='story-card__counter'>
            {story.narration_count || '∞'}
            {' cards'}
          </div>
        </div>
      </div>
    );
  }
}

export { StoryCardInfo };

export default StoryCard;
