import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import TitleLogo from './TitleLogo';
import logoRu from '../../img/logo-grey-ru.svg';
import logoEn from '../../img/logo-grey-en.svg';

storiesOf('TitleLogo', module)
  .add('just TitleLogo', () => (
    <BrowserRouter>
      <div>
        <TitleLogo logo={logoEn} />
        <TitleLogo logo={logoRu} />
      </div>
    </BrowserRouter>
  ));
