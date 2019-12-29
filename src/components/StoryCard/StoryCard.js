import React from 'react';
import { observer } from 'mobx-react';

import './StoryCard.less';

const StoryCardInfo = ({
  hover, story, style = {}
}) => (
  <div
    className={[
      'float-container',
      hover ? '' : 'story-card-info__hidden'].join(' ')}
    style={{ pointerEvents: 'all', ...style }}
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
  render() {
    const { story, handleStorySelection } = this.props;
    return (
      <div
        ref={(r) => { this.ref = r; }}
        role='button'
        tabIndex={0}
        onMouseEnter={() => this.props.setHover(true, story, this.ref)}
        onMouseLeave={() => this.props.setHover(false, story, this.ref)}
        className='float-container story-card'
        onClick={() => handleStorySelection(story.url)}
        onKeyPress={() => handleStorySelection(story.url)}
      >
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
