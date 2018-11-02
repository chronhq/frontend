import React from 'react';

import CollapsedView from '../../containers/CollapsedView/CollapsedView';
import ExpandedView from '../../containers/ExpandedView/ExpandedView';
import './SidePanel.less';

const SidePanel = () => (
  <div id='sidePanel'>
    <CollapsedView />
    <ExpandedView />
  </div>
);

export default SidePanel;
