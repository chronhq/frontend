import React, { Suspense, lazy } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Spinner from '../../components/Spinner/Spinner';
import './ErrorPage.less';

import japanImg from './japan.svg';
import astronout from './majortom.svg';
import egyptImg from './egypt.svg';

const TitleLogo = lazy(() => import('../../components/Logos/TitleLogo'));

@inject('store')
@observer
class ErrorPage extends React.Component {
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  render() {
    const Image = (this.props.code === 404)
      ? () => (
        <div className='background'>
          <img className='background__single' src={astronout} alt='astronout' />
        </div>)
      : () => (
        <div className='background'>
          <img className='over' src={japanImg} alt='japanese-warrior' />
          <img className='under' src={egyptImg} alt='egyptian-warrior' />
        </div>);
    return (
      <div className='error-page'>
        <Suspense fallback={<Spinner />}>
          <TitleLogo lng={this.lng} />
        </Suspense>
        <h1>
          {this.props.store.i18n.data.error.message}
        </h1>
        <h3>
          {this.props.code}
          {'... '}
          {this.props.store.i18n.data.error[this.props.code]}
        </h3>
        <Image />
      </div>
    );
  }
}

export default ErrorPage;
