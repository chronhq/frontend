import React from 'react';
import { YMInitializer } from 'react-yandex-metrika';

const YM_CONFIG = {
  defer: false,
  clickmap: true,
  trackLinks: true,
  // accurateTrackBounce: true,
  // webvisor: true,
  trackHash: false
};

class Analytics extends React.Component {
  render() {
    return (
      <div>
        {this.props.config.ym.enabled && (
          <YMInitializer
            accounts={[this.props.config.ym.id]}
            options={YM_CONFIG}
            version='2'
          />
        )}
      </div>
    );
  }
}

export default Analytics;
