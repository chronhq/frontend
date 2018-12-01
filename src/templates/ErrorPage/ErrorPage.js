/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React, { Suspense, lazy } from 'react';
import { inject, observer } from 'mobx-react';

import Spinner from '../../components/Spinner/Spinner';
import './ErrorPage.less';

import japanImg from './japan.svg';
import astronaut from './majortom.svg';
import egyptImg from './egypt.svg';

const TitleLogo = lazy(() => import('../../components/Logos/TitleLogo'));

@inject('store')
@observer
class ErrorPage extends React.Component {
  render() {
    const Image = (this.props.code === 404)
      ? () => (
        <div className='error-back'>
          <img className='error-back_single' src={astronaut} alt='astronaut' />
        </div>)
      : () => (
        <div className='error-back'>
          <img className='error-back_over' src={japanImg} alt='japanese-warrior' />
          <img className='error-back_under' src={egyptImg} alt='egyptian-warrior' />
        </div>);
    return (
      <div className='error'>
        <Suspense fallback={<Spinner />}>
          <TitleLogo logo={this.props.store.i18n.logo} />
        </Suspense>
        <h1>
          {this.props.store.i18n.data.error.message}
        </h1>
        <h4>
          {this.props.code}
          {'... '}
          {this.props.store.i18n.data.error[this.props.code]}
        </h4>
        <Image />
      </div>
    );
  }
}

export default ErrorPage;
