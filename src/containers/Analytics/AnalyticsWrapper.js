import React from 'react';
import { observer, inject } from 'mobx-react';

import Analytics from './Analytics';
import Button from '../../components/Button/Button';
import './AnalyticsWrapper.less';

@inject('store')
@observer
class AnalyticsWrapper extends React.Component {
  get renderNotification() {
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

  handleClick = () => {
    this.props.store.analytics.agreeWithPolicy();
    this.forceUpdate();
  }

  render() {
    const { config } = this.props.store.analytics;
    // Skip notification if no analytics
    const disabled = (!config.ym.enabled && !config.ga.enabled);
    return (
      <React.Fragment>
        {
          (this.props.store.analytics.agreement || disabled)
            ? <Analytics config={config} />
            : this.renderNotification
        }
      </React.Fragment>
    );
  }
}

export default AnalyticsWrapper;
