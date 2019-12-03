import React from 'react';
import { storiesOf } from '@storybook/react';
import Overlay, { overlayType } from './Overlay';
import Button from '../Button/Button';

storiesOf('Overlay', module)
  .add('black overlay', () => (
    <Overlay type={overlayType.BLACK}>
      <Button>
        Button
      </Button>
    </Overlay>
  ))
  .add('white overlay', () => (
    <Overlay type={overlayType.WHITE}>
      <Button>
        Button
      </Button>
    </Overlay>
  ));
