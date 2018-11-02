import React from 'react';
import { observer, inject } from 'mobx-react';

import Feedback from '../../containers/Feedback/Feedback';
import YearInput from '../../containers/YearInput/YearInput';

@inject('store')
@observer
class Overlays extends React.Component {
  render() {
    return (
      <div id='overlays'>
        <Feedback />
        {this.props.store.flags.flags.runtime.yearInput ? <YearInput /> : null}
      </div>
    );
  }
}

export default Overlays;
