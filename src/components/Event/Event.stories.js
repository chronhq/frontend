import React from 'react';
import { storiesOf } from '@storybook/react';
import Event from './Event';

const data = {
  active: {
    event: {
      id: 1,
      tick: 1,
      year: 2018,
      title: 'Title',
      description: 'description',
    },
    currentTick: 1,
    cb: () => console.log('cb')
  },
  usual: {
    event: {
      id: 2,
      tick: 2,
      year: 2018,
      title: 'Title',
      description: 'description',
    },
    currentTick: 1,
    cb: () => console.log('cb')
  },
  long: {
    event: {
      id: 2,
      tick: 2,
      year: 2018,
      title: 'Lorem ipsum dolor sit amet, natum erroribus ocurreret vix ea, pro an dolorum delectus adipiscing.',
      description: 'Lorem ipsum dolor sit amet, natum erroribus ocurreret vix ea, pro an dolorum delectus adipiscing. Cum et atqui labitur aliquid. Qui eu labitur complectitur. Ius meis mucius conclusionemque et.',
    },
    currentTick: 1,
    cb: () => console.log('cb')
  },
  longactive: {
    event: {
      id: 2,
      tick: 1,
      year: 2018,
      title: 'Lorem ipsum dolor sit amet, natum erroribus ocurreret vix ea, pro an dolorum delectus adipiscing.',
      description: 'Lorem ipsum dolor sit amet, natum erroribus ocurreret vix ea, pro an dolorum delectus adipiscing. Cum et atqui labitur aliquid. Qui eu labitur complectitur. Ius meis mucius conclusionemque et.',
    },
    currentTick: 1,
    cb: () => console.log('cb')
  }
};

storiesOf('Event', module)
  .add('active event', () => (
    <Event
      event={data.active.event}
      currentTick={data.active.currentTick}
      cb={data.active.cb}
    />
  ))
  .add('non active', () => (
    <Event
      event={data.usual.event}
      currentTick={data.usual.currentTick}
      cb={data.usual.cb}
    />
  ))
  .add('long event', () => (
    <Event
      event={data.long.event}
      currentTick={data.long.currentTick}
      cb={data.long.cb}
    />
  ))
  .add('long active event', () => (
    <Event
      event={data.longactive.event}
      currentTick={data.longactive.currentTick}
      cb={data.longactive.cb}
    />
  ));
