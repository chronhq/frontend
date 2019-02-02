import React from 'react';
import { storiesOf } from '@storybook/react';
import LayerToggle from './LayerToggle';

// const dumpData = {
//   layer: ['borders', 'cities'],
//   pins: ['persons', 'battle', 'document'],
// };

const data = {
  enabled: {
    id: 'borders',
    label: 'borders',
    place: 'borders',
    checked: true,
    name: 'name',
    cb: () => console.log('cb')
  },
  disabled: {
    id: 'cities',
    label: 'cities',
    place: 'cities',
    checked: false,
    name: 'name',
    cb: () => console.log('cb')
  }
};

storiesOf('LayerToggle', module)
  .add('enabled', () => (
    <LayerToggle
      id={data.enabled.id}
      key={`layer_${data.enabled.id}`}
      label={data.enabled.id}
      place={data.enabled.place}
      checked={data.enabled.checked}
      name={data.enabled.id}
      cb={data.enabled.cb}
    />
  ))
  .add('disabled', () => (
    <LayerToggle
      id={data.disabled.id}
      key={`layer_${data.disabled.id}`}
      label={data.disabled.id}
      place={data.disabled.place}
      checked={data.disabled.checked}
      name={data.disabled.id}
      cb={data.disabled.cb}
    />
  ));
