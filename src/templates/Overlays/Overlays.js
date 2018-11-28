import React from 'react';
import { observer, inject } from 'mobx-react';

import Feedback from '../../containers/Feedback/Feedback';
import YearInput from '../../containers/YearInput/YearInput';
import Bio from '../../components/TimelineBio/Bio';

@inject('store')
@observer
class Overlays extends React.Component {
  render() {
    return (
      <div id='overlays'>
        <Feedback />
        {this.props.store.flags.runtime.get('yearInput') ? <YearInput /> : null}
        <Bio />
      </div>
    );
  }
}

export default Overlays;
