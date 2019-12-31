import React from 'react';
import { storiesOf } from '@storybook/react';
import Button, { BUTTON_TYPE, BUTTON_SIZE, BUTTON_COLOR } from './Button';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justfyContent: 'space-between',
  backgroundColor: '#E9DAC5',
  height: '800px'
};

storiesOf('Button', module)
  .add('sizes', () => (
    <div>
      <Button btnSize={BUTTON_SIZE.NORMAL}>
        Normal
      </Button>
      <hr />
      <Button btnSize={BUTTON_SIZE.SMALL}>
        Small
      </Button>
    </div>
  ))
  .add('colors', () => (
    <div style={style}>
      <b>
        Enabled
      </b>
      <Button>
        Default
      </Button>
      <Button btnColor={BUTTON_COLOR.RED}>
        RED
      </Button>
      <Button btnColor={BUTTON_COLOR.VK}>
        VK
      </Button>
      <Button btnColor={BUTTON_COLOR.BLACK}>
        BLACK
      </Button>
      <Button btnColor={BUTTON_COLOR.LIGHT}>
        LIGHT
      </Button>
      <Button btnColor={BUTTON_COLOR.TRANSP}>
        TRANSP
      </Button>
      <b>
        Disabled
      </b>
      <Button disabled>
        Default
      </Button>
      <Button disabled btnColor={BUTTON_COLOR.RED}>
        RED
      </Button>
      <Button disabled btnColor={BUTTON_COLOR.VK}>
        VK
      </Button>
      <Button disabled btnColor={BUTTON_COLOR.BLACK}>
        BLACK
      </Button>
      <Button disabled btnColor={BUTTON_COLOR.LIGHT}>
        LIGHT
      </Button>
      <Button disabled btnColor={BUTTON_COLOR.TRANSP}>
        TRANSP
      </Button>
    </div>
  ))
  .add('types', () => (
    <div style={style}>
      <Button btnType={BUTTON_TYPE.BASIC}>
        BASIC
      </Button>
      <Button btnType={BUTTON_TYPE.CLOSE}>
        X
      </Button>
      <div
        style={{
          width: '50px', height: '50px', backgroundColor: '#fafafa', position: 'relative', margin: 'auto'
        }}
      >
        <Button btnType={BUTTON_TYPE.ICON} btnSize={BUTTON_SIZE.AUTO}>
          {'>'}
        </Button>
      </div>
    </div>
  ))
  .add('normal', () => (
    <div>
      <Button>
        Futsu
      </Button>
      <Button disabled>
        disabled
      </Button>
    </div>
  ))
  .add('close', () => (
    <div>
      <Button btnType={BUTTON_TYPE.CLOSE}>
        Close
      </Button>
    </div>
  ));
