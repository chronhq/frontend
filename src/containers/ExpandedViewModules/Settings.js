import React from 'react';
import { inject, observer } from 'mobx-react';

import FeedbackButtons from './FeedbackButtons';
import SetLocalization from './SetLocalization';

@inject('store')
@observer
class Settings extends React.Component {
  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          {this.props.store.i18n.data.settings.title}
        </h3>
        <SetLocalization i18n={this.props.store.i18n} />
        <FeedbackButtons onClose={this.props.onClose} />
      </div>
    );
  }
}

export default Settings;
