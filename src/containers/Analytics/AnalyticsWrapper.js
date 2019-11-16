import React from 'react';
import { observer, inject } from 'mobx-react';

import Analytics from './Analytics';
import Button from '../../components/Button/Button';
import './AnalyticsWrapper.less';

@inject('store')
@observer
class AnalyticsWrapper extends React.Component {
  get renderNotification() {
    const msg = this.props.store.i18n.data.gdpr;
    return (
      <div className='notification'>
        <div className='page--content'>
          <p>
            {msg.title}
            <br />
            {msg.message}
          </p>
          <Button onClick={this.handleClick}>
            {msg.agree}
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
      <>
        {
          (this.props.store.analytics.agreement || disabled)
            ? <Analytics config={config} />
            : this.renderNotification
        }
      </>
    );
  }
}

export default AnalyticsWrapper;
