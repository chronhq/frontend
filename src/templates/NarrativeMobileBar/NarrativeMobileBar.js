import * as React from 'react';

import LayerControlWrapper from '../../containers/LayerControlWrapper/LayerControlWrapper';
import './NarrativeMobileBar.less';

const NarrativeMobileBar = () => (
  <div className='narrative-mobile-bar'>
    <div className='narrative-mobile-bar__layers'>
      <LayerControlWrapper />
    </div>
  </div>
);

export default NarrativeMobileBar;
