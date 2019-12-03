import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';

storiesOf('Tooltip', module)
  .add('Tooltip', () => (
    <div>
      <Tooltip placement='left' content='content'>
        <Button type='button'>
          left
        </Button>
      </Tooltip>
      <Tooltip placement='right' content='content'>
        <Button type='button'>
          right
        </Button>
      </Tooltip>
      <Tooltip placement='top' content='content'>
        <Button type='button'>
          top
        </Button>
      </Tooltip>
      <Tooltip placement='bottom' content='content'>
        <Button type='button'>
          bottom
        </Button>
      </Tooltip>
      <Tooltip placement='bottom' dark content='content'>
        <Button type='button'>
          bottom dark
        </Button>
      </Tooltip>
    </div>
  ));
