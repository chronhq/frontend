import React from 'react';

import CollapsedView from './CollapsedView';
import ExpandedView from './ExpandedView';
import './SidePanel.less';

export default class SidePanel extends React.Component {
  render() {
    return (
      <div id='sidePanel'>
        <CollapsedView />
        <ExpandedView />
      </div>
    );
  }
}
