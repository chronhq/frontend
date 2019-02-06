import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  InputCheckBox,
  InputNumber,
  InputRange,
  InputSelect,
  InputRadio,
  TextInput,
  MailInput,
  TextareaInput
} from '.';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justfyContent: 'space-between',
  backgroundColor: '#E9DAC5',
  height: '500px',
  padding: '20px',
};

storiesOf('Inputs', module)
  .add('checkboxes', () => (
    <div style={style}>
      <InputCheckBox
        name='name'
        checked
        label='label'
        cb={() => console.log()}
        disabled={false}
      />
      <InputCheckBox
        name='name'
        checked={!true}
        label='label'
        cb={() => console.log()}
        disabled={false}
      />
      <InputCheckBox
        name='name'
        checked
        label='label'
        cb={() => console.log()}
        disabled={!false}
      />
      <InputCheckBox
        name='name'
        checked={!true}
        label='label'
        cb={() => console.log()}
        disabled={!false}
      />
    </div>
  ))
  .add('InputNumber', () => (
    <div>
      <InputNumber
        min={0}
        max={50}
        value={15}
        placeholder='placeholder'
        cb={() => console.log('cb')}
      />
    </div>
  ))
  .add('InputRange', () => (
    <div>
      <InputRange
        name='name'
        min={0}
        max={50}
        value={15}
        cb={() => console.log('cb')}
        label='label'
      />
    </div>
  ))
  .add('InputSelect', () => (
    <InputSelect
      value='value1'
      placeholder='placeholder'
      options={['value1', 'value2', 'value3']}
      cb={value => console.log('cb', value)}
    />
  ))
  .add('InputRadio', () => (
    <div style={style}>
      <InputRadio name='name' checked label='label' />
      <InputRadio name='name' checked={false} label='label' />
    </div>
  ))
  .add('TextInput', () => (
    <div>
      <TextInput
        value='value'
        name='title'
        placeholder='placeholder'
        invalid='onInvalid message'
        cb={() => console.log('cb')}
      />
      <TextInput
        value=''
        name='title'
        placeholder='placeholder'
        invalid='onInvalid message'
        cb={() => console.log('cb')}
      />
      <TextInput
        value='invalid input that values lenght exceed 80 symbols blah blah blah yada yada yada and more words'
        name='title'
        placeholder='placeholder'
        invalid='onInvalid message'
        cb={() => console.log('cb')}
      />
    </div>
  ))
  .add('MailInput', () => (
    <div>
      <MailInput
        value='test@example.com'
        name='email'
        placeholder='placeholder'
        invalid='invalid message'
        cb={() => console.log('cb')}
      />
      <MailInput
        value=''
        name='email'
        placeholder='placeholder'
        invalid='invalid message'
        cb={() => console.log('cb')}
      />
      <MailInput
        value='dfa@!$!&(*&%@^!(*&'
        name='email'
        placeholder='placeholder'
        invalid='invalid message'
        cb={() => console.log('cb')}
      />
    </div>
  ))
  .add('TextareaInput', () => (
    <div>
      <TextareaInput
        value='value'
        name='name'
        placeholder='placeholder'
        invalid='invalid message'
        cb={() => console.log('cb')}
      />
    </div>
  ));
