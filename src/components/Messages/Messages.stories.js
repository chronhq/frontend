import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  GeoEvent,
  PersonFact,
  Invention,
  Battle,
  Document
} from '.';

const dataGeoEvent = {
  title: 'title',
  description: 'description',
  date: 'date'
};

const dataPersonFact = {
  key: 'key',
  title: 'title',
  label: 'label',
  birthDate: 'birthDate',
  deathDate: 'deathDate',
  location: 'location',
};

const dataInvention = {
  key: 'key',
  title: 'title',
  name: 'name',
  description: 'description',
  inventDate: 'inventDate',
  inventors: 'inventors',
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
  .add('GeoEvent', () => (
    <div className='balloonNews'>
      <GeoEvent fact={dataGeoEvent} />
    </div>
  ))
  .add('PersonFact', () => (
    <div className='balloonNews'>
      <PersonFact person={dataPersonFact} />
    </div>
  ))
  .add('Invention', () => (
    <div className='balloonNews'>
      <Invention fact={dataInvention} />
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
