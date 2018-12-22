import React from 'react';

import './StoryCard.less';

const StoryCard = ({
  title,
  author,
  dates,
  cb,
  url
}) => (
  <div
    role='button'
    className='storycard'
    onClick={() => cb()}
  >
    <div className='storycard--title'>
      <h5>
        {title}
      </h5>
    </div>
    <span className='storycard--dates'>
      {dates.join(' - ')}
    </span>
    <div className='storycard--author'>
      <b>
        Author:
      </b>
      <p>
        {author}
      </p>
    </div>
    <div className='storycard--rating'>
      rate
    </div>
  </div>
);

export default StoryCard;
