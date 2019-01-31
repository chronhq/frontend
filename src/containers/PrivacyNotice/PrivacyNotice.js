import React from 'react';
import { observer, inject } from 'mobx-react';
import { YMInitializer } from 'react-yandex-metrika';

import Button from '../../components/Button/Button';
import './PrivacyNotice.less';

const YM_CONFIG = {
  defer: false,
  clickmap: true,
  trackLinks: true,
  // accurateTrackBounce: true,
  // webvisor: true,
  trackHash: false
};

@inject('store')
@observer
class PrivacyNotice extends React.Component {
  handleClick = () => {
    this.props.store.analytics.agreeWithPolicy();
    this.forceUpdate();
  }

  renderNotification() {
    return (
      <div className='notification'>
        <div className='page--content'>
          <p>
            {'This website uses cookies'}
            <br />
            {'We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. You consent to our cookies if you continue to use our website.'}
          </p>
          <Button onClick={this.handleClick}>
            {'Agree'}
          </Button>
        </div>
      </div>
    );
  }

  renderAnalytics() {
    return (
      <div>
        <h2>renderAnalytics</h2>
        <YMInitializer
          accounts={[50501221]}
          options={YM_CONFIG}
          version='2'
        />
      </div>
    );
  }

  render() {
    console.log('analytic prop', this.props.store.analytics.agreement);
    return (
      <React.Fragment>
        {
          (this.props.store.analytics.agreement)
            ? this.renderAnalytics()
            : this.renderNotification()
        }
      </React.Fragment>
    );
  }
}

export default PrivacyNotice;
