import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryCard from './StoryCard';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justfyContent: 'space-between',
  backgroundColor: '#E9DAC5',
  height: '500px',
  padding: '20px',
};

const storyData = {
  author: 'Chronist team',
  cb: () => console.log('cb'),
  dates: [1783, 2000],
  title: 'Interactive map of the world',
  url: 'world'
};

storiesOf('StoryCard', module)
  .add('just storycard', () => (
    <div style={style}>
      <StoryCard
        title={storyData.title}
        url={storyData.url}
        author={storyData.author}
        dates={storyData.dates}
        cb={storyData.cb}
      />
    </div>
  ));
