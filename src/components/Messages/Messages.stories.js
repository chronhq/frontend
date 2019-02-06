import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  PersonFact,
  Battle,
  Document
} from '.';

const dataPersonFact = {
  key: 'key',
  title: 'title',
  label: 'label',
  birthDate: 'birthDate',
  deathDate: 'deathDate',
  location: 'location',
};

const dataBattle = {
  key: 'key',
  dateText: 'dateText',
  label: 'label',
  description: 'description',
  participant: 'participant',
};

const dataDocument = {
  key: 'key',
  dateText: 'dateText',
  label: 'label',
  description: 'description',
};

storiesOf('Messages', module)
  .add('PersonFact', () => (
    <div className='balloonNews'>
      <PersonFact person={dataPersonFact} />
    </div>
  ))
  .add('Battle', () => (
    <div className='balloonNews'>
      <Battle fact={dataBattle} />
    </div>
  ))
  .add('Document', () => (
    <div className='balloonNews'>
      <Document fact={dataDocument} />
    </div>
  ));
