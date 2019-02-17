import React from 'react';
import { YMInitializer } from 'react-yandex-metrika';

class Analytics extends React.Component {
  render() {
    return (
      <div>
        {this.props.config.ym.enabled && (
          <YMInitializer
            accounts={[this.props.config.ym.id]}
            options={this.props.config.ym.config}
            version='2'
          />
        )}
      </div>
    );
  }
}

export default Analytics;
