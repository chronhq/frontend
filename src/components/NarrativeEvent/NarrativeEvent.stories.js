import React from 'react';
import { storiesOf } from '@storybook/react';
import NarrativeEvent from './NarrationInfo';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justfyContent: 'space-between',
  backgroundColor: '#E9DAC5',
  height: '500px',
  padding: '20px',
};

const eventData = {
  event: {
    tick: 1,
    title: 'Title',
    year: '2018',
    description: 'description'
  },
  currentTick: 1,
  cb: () => console.log('cb'),
  truncateText: (text) => text
};

storiesOf('NarrativeEvent', module)
  .add('event', () => (
    <div style={style}>
      <NarrativeEvent
        event={eventData.event}
        currentTick={2}
        cb={eventData.cb}
        truncateText={eventData.truncateText}
      />
    </div>
  ))
  .add('event active', () => (
    <div style={style}>
      <NarrativeEvent
        event={eventData.event}
        currentTick={eventData.currentTick}
        cb={eventData.cb}
        truncateText={eventData.truncateText}
      />
    </div>
  ));
