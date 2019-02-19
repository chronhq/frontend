import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import TitleLogo from './TitleLogo';
import logoLong from '../../img/logo-long.svg';
import logoShort from '../../img/logo-short.svg';

storiesOf('TitleLogo', module)
  .add('just TitleLogo', () => (
    <BrowserRouter>
      <div>
        <TitleLogo logo={logoShort} />
        <TitleLogo logo={logoLong} />
      </div>
    </BrowserRouter>
  ));
