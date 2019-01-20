import React from 'react';
import { storiesOf } from '@storybook/react';
import Overlay, { overlayType } from './Overlay';

storiesOf('Overlay', module)
  .add('black overlay', () => (
    <Overlay type={overlayType.BLACK}>
      <button type='button'>Button</button>
    </Overlay>
  ))
  .add('white overlay', () => (
    <Overlay type={overlayType.WHITE}>
      <button type='button'>Button</button>
    </Overlay>
  ));
