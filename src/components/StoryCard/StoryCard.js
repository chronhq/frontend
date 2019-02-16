import React from 'react';

import './StoryCard.less';

// TODO i18n for author
const StoryCard = ({
  story,
  handleStorySelection
}) => (
  <div
    role='button'
    tabIndex={0}
    className='storycard'
    onClick={() => handleStorySelection(story.url)}
    onKeyPress={() => handleStorySelection(story.url)}
  >
    <div className='storycard--title'>
      <h5>
        {story.title}
      </h5>
    </div>
    <span className='storycard--dates'>
      {[story.start_year, story.end_year].join(' - ')}
    </span>
    <div className='storycard--author'>
      <b>
        {'Author:'}
      </b>
      <p>
        {story.author}
      </p>
    </div>
    <div className='storycard--rating'>
      {'0'}
    </div>
  </div>
);

export default StoryCard;
